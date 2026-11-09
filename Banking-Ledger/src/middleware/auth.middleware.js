const userModel=require('../model/user.model')
const jwt=require('jsonwebtoken')


async function authMiddlewareUser(req,res,next){

    const token=req.cookies.token || req.headers.authorization.split(" ")[1]

    if(!token){
       return res.status(401).json({
            message:"Unauthorized token is missing"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decoded token:", decoded);

        const user=await userModel.findById(decoded.id)
        req.user=user

       return next()
                                        

    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorized access, token is invalid"
        })
    }

} 

module.exports={authMiddlewareUser}