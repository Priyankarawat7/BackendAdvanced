const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config()

const app=require('./src/app')

const connectDB = require('./src/db/db');

connectDB()
app.listen(3000,()=>{

    console.log('sever is running on port no. 3000');
    

})