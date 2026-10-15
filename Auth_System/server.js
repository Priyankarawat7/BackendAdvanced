const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config()
const app=require('./src/App')
const connectDB=require('./src/db/db')
connectDB()
app.listen(3000,()=>{
    console.log(`server is running on port 3000`);
    
})
