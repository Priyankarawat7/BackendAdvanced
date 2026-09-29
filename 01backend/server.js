const express=require('express')

const app=express() //server instace create kr rahe hain


app.get('/',(req,res)=>{ 
    res.send('hello world')
})

app.get('/about',(req,res)=>{
    res.send("about page")
})

// app.listen(3000,()=>{
//     console.log(`localhost is running ${}`);
    
// })

app.listen(3000) //to start the server 