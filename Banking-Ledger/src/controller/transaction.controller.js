const transactionModel=require('../model/transaction.model')
const ledgerModel=require('../model/ledger.model')
const emailService=require('../services/email')
const accountModel=require('../model/account.model')

async function createTransaction(req,res){


    const {fromAccount,toAccount,amount,idempotencyKey}=req.body

                        
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
        user:req.user._id
    })

    if(!fromUserAccount){
        return res.status(401).json({
            message:"System user account not found"
        })
    }

    const session=await mongoose.startSession()
    session.startTransaction()

    const transaction=await transactionModel.create({
        fromAccount:fromUserAccount._id,
        toAccount,
        amount,
        idempotencyKey,
        status:"Pending"
    },{session})

    const debitLedgerEntry=await ledgerModel.create({
        account:fromUserAccount._id,
        amount:amount,
        transaction:transaction._id,
        type:"Debit"
    },{session})

    const creditLedgerEntry=await ledgerModel.create({
        account:toAccount,
        amount:amount,
        transaction:transaction._id,
        type:"Credit"
    },{session})

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