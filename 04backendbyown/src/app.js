const express=require('express')

const classModel=require('./models/data.model')


const app=express()
app.use(express.json())


app.post('/notes',async(req,res)=>{
    const data=req.body

    await classModel.create({
    name:data.name,
    course:data.course,
    description:data.description

    })
    res.status(201).json({
        message:"Class created successfully"
    })
})
app.get('/notes',async(req,res)=>{

    const classes =await classModel.find()


     res.status(201).json({
        message:"Class fetched successfully",
        classes:classes
    })
    
})
app.delete('/notes/:id',async(req,res)=>{


     res.status(201).json({
        message:"Class deleted successfully"
    })
    
})
app.patch('/notes/:id',async(req,res)=>{

     res.status(201).json({
        message:"Class updated successfully"
    })
    
})




module.exports=app