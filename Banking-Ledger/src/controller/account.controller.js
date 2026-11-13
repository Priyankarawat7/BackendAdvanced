const mongoose=require('mongoose')
const accountModel=require('../model/account.model')

//const emailService=require('../services/email')
async function createAccount(req,res){
    const user=req.user

    const account=await accountModel.create({
        user:user._id,
        currency:'INR'

    })

    res.status(201).json({
        message:"Account created successfully",
        account
    })

}

async function getUserAccountController(req,res){

    const accounts=await accountModel.find({
        user:req.user._id

        })
    res.status(201).json({
       //message:"User Account  fetched sucessfully",
        accounts
    })
}

async function getAccountBalanceController(req,res){

    const {accountId}=req.params;

    const account=await accountModel.findOne({
        _id:accountId,
        user:req.user._id
    })

    if(!account)
    {
        return res.status(401).json({
            message:"Account not found"
        })
    }

    const balance=await account.getBalance();

    res.status(200).json({
        accountId:account._id,
        balance:balance
    })
}

module.exports={createAccount,getUserAccountController,getAccountBalanceController}