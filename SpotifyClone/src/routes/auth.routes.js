const express=require('express')
const authController=require('../controller/auth.controller')


const router=express.Router()


router.post('/create',authController.registerUser)

router.post('/login',authController.loginUser)
router.post('/logout',authController.logout)


module.exports=router