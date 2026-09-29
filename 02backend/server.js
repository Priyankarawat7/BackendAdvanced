// this file used to start the servers

const app=require('./src/app')


app.listen(3000,()=>{
    console.log(`server is running on port 3000`);
})