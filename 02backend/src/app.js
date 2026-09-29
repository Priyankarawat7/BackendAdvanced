//this file is used to create the server

const express=require('express')

const app=express()

const notes=[
    {
    title:'my first note',
    description:"this is my first note"
    },
     {
    title:'my second note',
    description:"this is my second note"
    },
     {
    title:'my third note',
    description:"this is my third note"
    },
     {
    title:'my fourth note',
    description:"this is my fourth note"
    },
    
    ]

app.post('/notes',(req,res)=>{

    // notes.push
    // res.send()

    console.log(req.body);
    

})


module.exports=app


