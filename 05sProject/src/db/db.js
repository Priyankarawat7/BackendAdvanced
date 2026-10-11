const mongoose=require('mongoose')

async function connectDB()
{   
    await mongoose.connect('mongodb+srv://priyanka:k2V.D%25z2S6Ta67R@cluster0.jtdbu8a.mongodb.net/project-1')

    console.log('connected to DB');
    
}

module.exports=connectDB