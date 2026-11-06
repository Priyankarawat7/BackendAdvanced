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

module.exports={createAccount}