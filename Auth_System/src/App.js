const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const authRoutes=require('../src/routes/auth.routes')
const postRoutes=require('../src/routes/post.routes')
const cookieParser=require('cookie-parser')

const app=express()

app.use(express.json())
app.use(cookieParser())

//to access the  post,get api which is stored in the routes we have to use the prefix
app.use('/api/auth',authRoutes)
app.use('/api/posts',postRoutes)



module.exports=app