const express=require('express')
// const controller=require('../controller/auth.controller')
const router=express.Router()


router.post('/create',(req,res)=>{
   
    const token=req.cookies.token;

    if(!token){
        res.status(401).send("Unauthorized")
    }


    res.send('Post created successfully')
    
    
})


module.exports=router