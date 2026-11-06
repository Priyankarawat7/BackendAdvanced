const express=require('express')
const accountController=require('../controller/account.controller')
const authMiddleware=require('../middleware/auth.middleware')
const router=express.Router()


// Post /api/accounts/
//--Create a new Account
//--Protected Route
router.post('/',authMiddleware.authMiddlewareUser,accountController.createAccount)

module.exports=router