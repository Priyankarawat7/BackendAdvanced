const express=require('express')

const app=express()

app.use(express.json())


app.get('/',(req,res)=>{
    res.status(200).json({message:"hello world!"})
})

app.post('/register',(req,res)=>{

    const {username,email,password}=req.body

   res.status(200).json({
    message:"user registered sucessfully"
   })
})

module.exports=app