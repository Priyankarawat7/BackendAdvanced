const mongoose = require('mongoose');
const transactionModel=require('../model/transaction.model')
const ledgerModel=require('../model/ledger.model')
const emailService=require('../services/email')
const accountModel=require('../model/account.model')


// **Create a new Transaction
// The 10-Stap transfer flow:
// 1.Validate request
// 2.Validate Idempontency key
// 3.Check account status
// 4.Derive sender balance from ledger
// 5.Create Transaction (Pending)
// 6.Create Debit ledger Entry
// 7.Create Credit ledger Entry
// 8.Mark Transaction Completed
// 9.Commit MongoDb session
// 10.Send email notification
  
async function createTransaction(req,res){

    /**
     1.Validate Request
     */

    const {fromAccount,toAccount,amount,idempotencyKey}=req.body

    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
       return res.status(400).json({
            message:"FromAccount ,toAccount ,amount and idempotenct are required "
        })
    }

    const fromUserAccount=await accountModel.findOne({
        _id:fromAccount
    })
    const toUserAccount=await accountModel.findOne({
        _id:toAccount
    })
    if(!fromUserAccount || !toUserAccount){
        return res.status(400).json({
            message:"Invalid fromAccount or toAccount"
        })
    } 
    
    /**
     2.Validate Idempontency key
    */
   const isTransactionAlreadyExist=await transactionModel.findOne({
        idempotencyKey:idempotencyKey
   })

   if(isTransactionAlreadyExist){
        if(isTransactionAlreadyExist.status=='Completed'){
            return res.json(201).json({
                message:"Transaction Already Processed"
            })
        }
        if(isTransactionAlreadyExist.status=="Pending"){
        return res.status(401).json({
        message:"Transaction is Still in Processing"
    })

    }
        if(isTransactionAlreadyExist.status=='Failed'){
            return res.status(500).json({
                message:"Previous transaction is failed try again"
            })
        }   
        if(isTransactionAlreadyExist.status=='Reversed'){
            return res.status(500).json({
                message:"Transaction was reversed please try again"
            })
        }
   } 
   
/**
 *  3..Check account status
 * fromAccount and toAccunt dono ki Active hona pdega
  */   
   if(fromUserAccount.status !=='Active' || toUserAccount.status !=="Active")
   {
    return res.status(400).json({
        message:"Both fromAccount and toAccount must be Active to process transaction"
    })
   }

/**
     *  4.Derive sender balance from ledger
 *  Jiske account se pese deduct hone vale h uske account mai sufficient balance h ki nhi
 * Aggregation 
 * */
   
   const balance=await fromUserAccount.getBalance()

   if(balance>amount){
    return res.status(500).json({
        message:`Insufficient Balance .Current balance is ${balance}.Requested amount is ${amount}`
    })
   }

/**
 * 5.Create Transaction (Pending)
 *  */ 

   const session=await mongoose.startSession()
   session.startTransaction()
    const transaction=await transactionModel.create([{
        fromAccount,
        toAccount,
        amount,
        idempotencyKey,
        status:"Pending"
    }],{session})

    const debitLedgerEntry=await ledgerModel.create([{
        account:fromUserAccount._id,
        amount:amount,
        transaction:transaction._id,
        type:"Debit"
    } ],{session})

    const creditLedgerEntry=await ledgerModel.create([{
        account:toAccount,
        amount:amount,
        transaction:transaction._id,
        type:"Credit"
    }],{session})

    transaction.status="Completed"
    await transaction.save({session})

    await session.commitTransaction()
    session.endSession()
                 
/**
 * 10 Send Email Notification
 */
await emailService.sendTransactionEmail(req.user.email,req.user.name,amount,toAccount)

return res.status(201).json({
    message:"Transaction Completed Sucessfully",
    transaction:transaction
})
                      
}

async function createInitialFundsTransaction(req,res){

     const {toAccount,amount,idempotencyKey}=req.body

     if(!toAccount || !amount || !idempotencyKey){
          console.log("Request Body:", req.body);
        console.log("toAccount:", toAccount);
            console.log("amount:", amount);
        console.log("idempotencyKey:", idempotencyKey);
        return res.status(400).json({
            message:"toAccount,amount and idempotency are required",
//           
        })
     }

     const toUserAccount=await accountModel.findOne({
        _id:toAccount,
     })
     if(!toUserAccount){

        return res.status(401).json({
            message:"Invalid toAccount"
        })

     }

     //Assuming system user has a predefined account ID
    const fromUserAccount=await accountModel.findOne({
        systemUser:true,
       // user:req.user._id
    })

    if(!fromUserAccount){
        return res.status(401).json({
            message:"System user account not found"
           
        })
    }

    const session=await mongoose.startSession()
    session.startTransaction()

    const transaction=new transactionModel({
        fromAccount:fromUserAccount._id,
        toAccount,
        amount,
        idempotencyKey,
        status:"Pending"
    })

    const debitLedgerEntry=await ledgerModel.create([{
        account:fromUserAccount._id,
        amount:amount,
        transaction:transaction._id,
        type:"Debit"
    } ],{session})

    const creditLedgerEntry=await ledgerModel.create([{
        account:toAccount,
        amount:amount,
        transaction:transaction._id,
        type:"Credit"
    }],{session})

    transaction.status="Completed"
    await transaction.save({session})

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
        message:"Initial funds transaction completed Succesfully",
        transaction:transaction
    })

       
}


module.exports= {createTransaction,createInitialFundsTransaction}