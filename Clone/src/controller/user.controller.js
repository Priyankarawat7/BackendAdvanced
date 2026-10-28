const userModel=require('../model/user.model')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


async function userRegister(req,res){

    const {username,email,password,role}=req.body
    const isUserAlreadyExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        res.status(401).json({
            message:"user already exist"
        })

    }
    const hash=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hash,
        role
    })
    
    const token=jwt.sign({
        id: user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:"user register sucessfully",
        user:{
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role

        }
       
    })
}

async function loginUser(req,res){
    const {username,email,password}=req.body
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    const isPasswordValid=await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
       return res.status(401).json({  message:"Invalid password" })
    }

    const token=jwt.sign({
         id:user._id,
        role:user.role
       

    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(200).json({
        message:"Login user successfully",
         id:user._id,
        username:user.username,
        email:user.email,
        role:user.role
    })


}

module.exports={userRegister,loginUser}