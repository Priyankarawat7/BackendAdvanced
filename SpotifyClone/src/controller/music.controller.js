const musicModel=require('../model/music.model')
const albumModel=require('../model/album.model.js')
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

    
   

    const {title}=req.body

    const file=req.file    
    const result=await uploadFile(file.buffer.toString('base64'))    
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

    catch(err){
        return res.status(401).json({message:"Unauthorized"})
                
    }


     
}

async function createAlbum(req,res){
    const token=req.cookies.token

    if(!token){
        res.status(401).json({message:"Unathorized"})
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role!=='artist'){
            return res.status(403).json({message:"you don't have access to create a album "})
        }
        const {title,musicIds}=req.body;

        const album=await albumModel.create({
            title,
            artist:decoded.id,
            musics:musicIds
        })
        res.status(201).json({
            message:"Album created successfully",
            album:{
            id: album._id,
            title: album.title,
            artist: ablum.artist,
            music: album.musics          
        }

        })
      

    }
    catch(err){
         res.status(401).json({message:"Unathorized"})

    }

}

module.exports={createMusic,createAlbum}