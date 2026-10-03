const mongoose=require('mongoose')

const classSchema=({
    name:String,
    course:String,
    description:"String"
})

const classModel=mongoose.model("data",classSchema)


module.exports=classModel