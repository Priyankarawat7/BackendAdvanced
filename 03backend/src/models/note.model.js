const mongoose=require('mongoose')

const noteSchema= new mongoose.Schema({
    title: String,
    description: String,
   
})
// To perfrom operation we create noteModel
const noteModel=mongoose.model('note',noteSchema)


//CRUD operation
// Create -POST
// Read-GET
// Update -PATCH
// Delete-DELETE

module.exports=noteModel