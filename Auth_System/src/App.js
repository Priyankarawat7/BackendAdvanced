const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const authRoutes=require('../src/routes/auth.routes')

const app=express()

app.use(express.json())

//to access the api we have to use the prefix
app.use('/api/auth',authRoutes)



module.exports=app