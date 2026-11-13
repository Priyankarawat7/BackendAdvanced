const mongoose=require('mongoose')
const ledgerModel=require('../model/ledger.model')
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

accountSchema.methods.getBalance =async function (){
        const balanceData=await ledgerModel.aggregate([
            {
                $match:{
                    account :this._id
                }
            },
            {
                $group:{
                    _id:null,
                   totalDebit:{
                    $sum:{
                        $cond:[
                            {$eq:["$type","Debit"]},
                            "$amount",
                            0
                        ]
                    }
                   },
                   totalCredit:{
                    $sum:{
                        $cond:[
                            {$eq:["$type","Credit"]},
                            "$amount",
                            0
                        ]
                    }
                   }
                 
                }
                
            },
            {
                 $project:{
                    _id:0,
                    balance:{$subtract :["$totalCredit","$totalDebit"]}
                   }

            }
             

        ])
    if(balanceData.length===0){
        return 0
    }
    return balanceData[ 0 ].balance
}

const accountModel=mongoose.model('account',accountSchema)

module.exports=accountModel