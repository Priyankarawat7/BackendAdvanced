 const {ImageKit}=require('@imagekit/nodejs')

 const ImageKitClient=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
 })

 async function uploadFile(buffer){

    const base64File = buffer.toString("base64");

    const result=await ImageKitClient.files.upload({
        file: base64File,
        fileName:"music_"+Date.now(),
        folder:"yt-complete-backend/music"

    })
    return result

}
module.exports={uploadFile}