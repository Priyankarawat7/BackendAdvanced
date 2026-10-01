//this file is used to create the server

const express=require('express')

const app=express()
app.use(express.json()) //the data is coming through api. we can read

const notes=[]


//post-> to push data on  fronted
app.post('/notes',(req,res)=>{
     notes.push(req.body)
     res.status(201).json({
        message:"note created sucessfully"
     })
     //res.send(req.body)
    console.log(req.body);
    
})

//GET - to fetch data from fronted /notes 
app.get('/notes',(req,res)=>{
    res.status(200).json({
        message:"Notes fetch sucessfully",
        notes:notes
    })

})

// Delete /notes/:index ->1,2,3... whatever you want to delete

app.delete('/notes/:index',(req,res)=>{

    const index=req.params.index /* 1 */
    delete notes[index]
    res.status(200).json({
        message:"note delete successfully"
    })


})

// Patch->
//description will only update discription 
// if you have to update title you can also need to write program title
app.patch('/notes/:index',(req,res)=>{
    const index=req.params.index
    const description=req.body.description
    notes [index].description=description

    res.status(200).json({
        message:"notes updated successfully"
    })
})

module.exports=app


