const express=require('express')
const AuthController=require('../controller/auth.controller')
const router=express.Router()


// Post /api/auth/register
router.post('/register',AuthController.userRegister)

// Post /api/auth/login
router.post('/login',AuthController.loginUser)
module.exports=router