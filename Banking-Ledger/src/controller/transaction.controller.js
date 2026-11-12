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
     1.Validate Idempontency key
     */

    
                        
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