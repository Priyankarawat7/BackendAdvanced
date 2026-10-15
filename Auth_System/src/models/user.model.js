const mongoose=require('mongoose')

const AuthSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String

})

const userModel= mongoose.model('user',AuthSchema)

module.exports=userModel