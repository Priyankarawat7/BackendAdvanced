const { ImageKit } = require("@imagekit/nodejs");
const { clientEncryption } = require("../models/post.model");

const imagekit= new ImageKit({
    privateKey:'private_r8q4EmJEs3r4wmMAPcPdlqqYf/s='


})

async function uploadFile(buffer){

    const base64File = buffer.toString("base64");

    const result=await imagekit.files.upload({
        file: base64File,
        fileName:"image.jpg"
    })
    return result

   

}

module.exports=uploadFile

