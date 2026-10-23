const express=require('express')
// const controller=require('../controller/auth.controller')
const userModel=require("../models/user.model")
const jwt = require('jsonwebtoken');
const router=express.Router()


router.post('/create',async(req,res)=>{
   
    const token=req.cookies?.token;
    //console.log(req.body);
    if(!token){
      return  res.status(401).json({
        message:"Token not found"
    })
}

try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    //console.log('Decoded token',decoded);
    
    const user=await userModel.findOne({
        _id:decoded.id
    })
    console.log(user);
    
       
} catch (err) {
    return res.status(401).json({
        message:"Token is Invalid"
    })
    
}
 //console.log(req.cookies);
    res.status(201).json({
        message:'Post created successfully',
    })  
})


module.exports=router