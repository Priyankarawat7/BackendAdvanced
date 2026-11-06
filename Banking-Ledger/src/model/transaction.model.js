const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({

    fromAccount:{

    },
    toAccount:{
        
    }


})

const transactionModel= mongoose.model('transaction',transactionSchema)


module.exports=transactionModel