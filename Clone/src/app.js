const express=require('express')
const cookiePaser=require('cookie-parser')
const userroutes=require('./routes/user.routes')

const app=express()

app.use(express.json())
app.use(cookiePaser())

app.use('/api/auth',userroutes)



module.exports=app