const express=require('express')
const multer=require('multer')
const postModel=require('./models/post.model')
const uploadFile=require('./services/storage.services')


const app=express()
app.use(express.json())

const upload=multer({storage:multer.memoryStorage() })


app.post('/create-post',upload.single('image'), async(req,res)=>{
    const result= await uploadFile(req.file.buffer)

    const post= await postModel.create({
        image: result.url,
        caption:req.body.caption

    })
    return res.status(201).json({

       message:'created successfully',
       post
        
    })

})


app.get('/posts',async(req,res)=>{

    const post =await postModel.find()
    return res.status(200).json({
        message:"post fetched succssfully",
        post
    })

})

module.exports=app