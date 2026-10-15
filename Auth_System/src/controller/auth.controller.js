const { model } = require('mongoose')
const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')


async function registerUser(req,res){
    const {username,email,password}=req.body

   const user=userModel.create({
    username,email,password

   })
   const token=jwt.sign({
    id:user._id
   },process.env.JWT_SECRET)
    return res.staus(201).json({
        message:"user register succesfully",
        user

    })

   
}


module.exports={registerUser }