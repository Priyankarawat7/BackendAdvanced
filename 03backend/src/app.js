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
//Find->[{},{}] or [] for all ->return data in the form of array
//findOne->{} or Null only one ->return data in the form of object

app.get('/notes',async(req,res)=>{
    // const notes=await noteModel.findOne({

    //     title:"test_title"

    // }) // []
    const notes=await noteModel.find(
        //{
      //  title:"test_title" //you can give condition here also
   // }
) 

    res.status(200).json({
        message:"note fetched sucessfully",
        notes:notes  //to see the data
        //data fetch in the form of array
    })
})


// DELETE /notes - DELETE a Note

app.delete('/notes/:id',async(req,res)=>{
    const id=req.params.id

    await noteModel.findOneAndDelete({
        _id:id                   
    })

    res.status(200).json({
        message:"note delete sucessfully"
    })
})

// PATCH /notes - UPDATE a Note

 app.patch('/notes/:id',async(req,res)=>{
    const id=req.params.id
    const description=req.body.description
    await noteModel.findOneAndUpdate({_id: id},{description:description})

    res.status(200).json({
        message:"note updated sucessfully"
    })
})


module.exports=app