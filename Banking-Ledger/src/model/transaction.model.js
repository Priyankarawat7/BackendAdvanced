const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({

    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"amount",
        required:[true,"Transaction must be associated with a from amount"],
        index:true

    },
    toAccount:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"amount",
        required:[true,"Transaction must be associated with a to amount"],
        index:true
        
    },
    status:{
        type:String,
        enum:{
            values:['Pending','Completed','failed','Reversed'],
            message:"Status can be either Pending ,Completed,Failed or Reversed"
        },
        default:"Pending"
          
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for creating a transaction"],
        min:[0,"Transaction amount connot be negative"]

    },
    idempotencyKey:{
        type:String,
        required:[true,"idempotencyKey Key is required for creating a transaction"],
        index:true,
        unique:true 
    }
},
    {
        timestamps:true
    })

const transactionModel= mongoose.model('transaction',transactionSchema)


module.exports=transactionModel