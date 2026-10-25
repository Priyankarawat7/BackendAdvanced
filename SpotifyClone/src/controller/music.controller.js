const musicModel=require('../model/music.model')
const {uploadFile}=require('../services/storage.service.js')
const jwt=require('jsonwebtoken')

async function createMusic(req,res){

    
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role !=='artist'){
            return res.status(403).json({message:"You don't have access to create a music"})
        }

    }
    catch(err){
        return res.status(401).json({message:"Unauthorized"})

    }

    const {title}=req.body

    const file=req.file 
   


    const music =await musicModel.create({
        uri:result.url,
        title,
        artist:decoded.id,
    })
    res.status(201).json({
        mesaage:"Music created successfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist
        }
    })

     
}

module.exports={createMusic}