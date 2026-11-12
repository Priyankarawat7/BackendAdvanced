const mongoose=require('mongoose')

const accountSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'Account must ve associated with a user'],
        index:true //to find and the speed would be fast for searching 
    },
       systemUser: {
        type: Boolean,
        default: false
    },
    status:{
        type:String,
        enum:{
            values:['Active','Frozen','Closed'],
            message:'Status can be better Active,Frozen or CLosed',
           
    },
     default:'Active'
    
},
        currency:{
            type:String,
            required:[true,'Currency is required for creating an account'],
            default:'INR'
        }
        
    }, {
        timestamps:true
    
    
})

//find according status
accountSchema.index({user:1,status:1})

const accountModel=mongoose.model('account',accountSchema)

module.exports=accountModel