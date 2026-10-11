const express=require('express')
const multer=require('multer')
const uploadFile=require('./services/storage.services')
const app=express()

app.use(express.json())

const upload=multer({storage: multer.memoryStorage()})
//you are sending file this time to read the file using multer

app.post('/create-post', upload.single('image'),async(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    const result= await uploadFile(req.file.buffer)
    console.log(result);

     res.json({
        message: "File uploaded successfully",
        result

    })

    
    
    

})



module.exports=app