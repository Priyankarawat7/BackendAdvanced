const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config()
//to access the variable which is stored in the .env MONGO_URI
const app=require('./src/App')
const connectDB=require('./src/db/db')
connectDB()
app.listen(3000,()=>{
    console.log(`server is running on port 3000`);
    
})
