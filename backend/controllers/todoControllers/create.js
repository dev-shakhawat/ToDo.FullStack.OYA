const todoSchema = require('../../schema/todoSchema') 
const deleteImage = require('../../helpers/mediaDelete');



async function createTodo(req , res){

 
    try{
      
        if(!req.body.text && !req.file ) return res.status(400).send({ success: false , message : "Add something" })   

        const todo = await todoSchema.create({ 
            userID: req.user._id , 
            mediaPublicID: req.file ? req.file.public_id : null , 
            priority: req.body.priority  ,  
            text :req.body.text || ""  , 
            mediaType: req.file ? req.file.resource_type : null , 
            media: req.file ? req.file.url : null , 
        })  // create todo in database
        
        if(!todo) {

            await deleteImage(req.file.filename , req.file.resource_type)

            return res.status(200).send({ success: false , message : "Todo creation failed" })  // send success message to client
        }
 
        return res.status(200).send({ success: true , message : "Todo created successfully" , todo })  // send success message to client

    }catch(error){

            if (req.file)  await deleteImage(req.file.public_id , req.file.resource_type ) 

        return res.status(400).send({ error: error.message || "Something went wrong" })  // send error message to client
    }
}







module.exports = createTodo