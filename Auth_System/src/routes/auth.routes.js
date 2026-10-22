const express=require('express')
const authController=require('../controller/auth.controller')

const router=express.Router()


//"Post" register  /api/auth/register
router.post('/register',authController.registerUser)

  
// "Get"
router.get('/test',(req,res)=>{
    console.log('Cookies:',req.cookies);
    res.json({
        message:"Access Test route",
        cookies:req.cookies
    })
    
})   



module.exports=router