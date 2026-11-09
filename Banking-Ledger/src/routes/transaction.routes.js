const {Router}=require('express')

const transactionRouter=Router()
const transactionController=require('../controller/transaction.controller')

//post
//-Post /api/transaction/
// --Create a new transaction



transactionRouter.post('/create' ,transactionController)

module.exports=transactionRouter
