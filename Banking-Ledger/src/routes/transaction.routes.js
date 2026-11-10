const {Router}=require('express')
const transactionRouter=Router()
const transactionController=require('../controller/transaction.controller')
const authMiddleware=require('../middleware/auth.middleware')

//post
//-Post /api/transactions/
// --Create a new transaction



transactionRouter.post('/' ,authMiddleware.authMiddlewareUser,transactionController.createTransaction)

// Post /api/transactions/system/initial-funds
// Create initial funds transaction from system user
transactionRouter.post('/system/initial-funds',authMiddleware.authMiddlewareUser,transactionController.createInitialFundsTransaction)


module.exports=transactionRouter
