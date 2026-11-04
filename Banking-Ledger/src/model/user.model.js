const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')


const userSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,"Email is required for creating account"],
            trim:true,
            unique:[true,"Email already exists"],
            lowercase:true,
             match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
        },
        name:{
            type:String,
            required:[true,"Name is required for creating an account"]

        },
        password:{
            type:String,
            required:[true,"password is required for creating an account"],
            minlength:[6,"password should contain more than 6 character"],
            select:false

        }
    
    },{
        timestamps:true                  
    }
)

userSchema.pre('save',async function(next){
    
    //acount ka access nhi jata
    //user password change krta hai to modified 
    // modified hua to usko convert kro hash mai

    if(!this.isModified("password")){
        return  
        //next()

    }
    const hash=await bcrypt.hash(this.password,10)
    this.password=hash

    //return next()
})


userSchema.methods.comparePassword=async function(password){
    console.log(password,this.password);
    
    return await bcrypt.compare(password,this.password)
}


const userModel=mongoose.model('user',userSchema)

module.exports=userModel