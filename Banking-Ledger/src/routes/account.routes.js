const express=require('express')
const accountController=require('../controller/account.controller')
const authMiddleware=require('../middleware/auth.middleware')
const router=express.Router()


// POST /api/accounts/
//--Create a new Account
//--Protected Route
router.post('/',authMiddleware.authMiddlewareUser,accountController.createAccount)

//--GET /api/accounts/
    //get all accounts of the logged-in user
    //Protected Route
router.get('/',authMiddleware.authMiddlewareUser,accountController.getUserAccountController)

// -GET /api/accounts/balance/:accountId


module.exports=router