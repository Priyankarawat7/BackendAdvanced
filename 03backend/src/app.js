const express=require('express')
const noteModel=require('./models/note.model.js')

const app=express()
app.use(express.json())

// agr tumhe data store krna h toh btana pdega data kesa dikhta hai 

// Schema create krna
// note= {title,description}



// Perform operation using notemodel

// POST /notes - Create a Note

app.post('/notes',async (req,res)=>{

    const data=req.body  //{title,description}
   await  noteModel.create({
        title:data.title,
        description:data.description
    })

    res.status(201).json({
        message:"Note created"
    })
})

// GET /notes - GET a Note


// DELETE /notes - DELETE a Note


// PATCH /notes - UPDATE a Note


module.exports=app