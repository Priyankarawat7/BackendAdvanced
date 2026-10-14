const express=require('express')
const multer=require('multer')
const uploadFile=require('./services/storage.services')
const postModel = require('./models/post.model')
const cors=require('cors')
const app=express()

app.use(express.json())
app.use(cors())

const upload=multer({storage: multer.memoryStorage()})
//you are sending file this time to read the file using multer

//Set up ImageKit
//with the help of private key we create the SDK of imagekit in storage.service.js
//setup imagekit inside the storage.services.js by private key 

app.post('/create-post', upload.single('image'),async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    const result= await uploadFile(req.file.buffer)
    //console.log(result);
    const post=await postModel.create({
        image:result.url,
        caption:req.body.caption
    })

    return res.status(201).json({
        message:"post created sucessfully",
        post
    })
})

app.get('/posts',async (req,res)=>{

    const posts=await postModel.find()

        return res.status(200).json({
            message:"Posts fetched sucessfully",
            posts
        })

    
    
})



module.exports=app