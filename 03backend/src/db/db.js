
const mongoose = require('mongoose')
const dns = require('dns')

dns.setServers(['8.8.8.8', '1.1.1.1'])

async function connectDB() {
   await mongoose.connect('mongodb+srv://priyanka:k2V.D%25z2S6Ta67R@cluster0.jtdbu8a.mongodb.net/halley')
    

    console.log('connected to DB')
}

module.exports = connectDB