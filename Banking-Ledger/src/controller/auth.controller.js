const userModel=require('../model/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

// user registered controller
async function userRegister(req,res){

    const {email,name,password} = req.body

    const isUserAlreadyExists=await userModel.findOne({
            email:email
        
    })

    if(isUserAlreadyExists){
      return  res.status(401).json({
            message:"user already exists with email",
            status:"failed"
        })
    }
    //const hash = await bcrypt.hash(password,10)


    const user=await userModel.create({
        email,
        name,
        password

    })

    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,{expiresIn:'3d'})

    res.cookie('token',token)

    res.status(201).json({
        message:"user registered sucessfully",
        user:{
        id:user._id,
        email:user.email,
        name:user.name, 

        }
                         
    }),
    token
}

async function loginUser(req,res){

    const {email,password}=req.body;

    const user=await userModel.findOne({
        email:email
    }).select('+password')

    if(!user){
       return res.status(401).json({
            message:"user doesn't exists "
       
        })
    }

    const isPasswordValid=await  user.comparePassword(password)

    if(!isPasswordValid){
       return res.status(401).json({
            message:"Incorrect Password"
        })
    }

    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:"user Logged In Sucessfully",
        user:{
            id:user._id,
            email:user.email,
            name:user.name

        }
    })

}

module.exports={userRegister,loginUser}