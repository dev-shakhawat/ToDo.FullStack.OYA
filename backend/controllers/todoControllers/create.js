const todoSchema = require('../../schema/todoSchema') 
const deleteImage = require('../../helpers/mediaDelete');



async function createTodo(req , res){
 
    
    
    try{
         
      
        if(!req.body.text && !  req.file ) return res.status(400).send({ success: false , message : "Add something" })   

        let mediaType = null ; 

        if(req.file){

            mediaType = req.file.mimetype.split('/')[0] 

        }

        const todo = await todoSchema.create({ mediaPublicID: req.file ? req.file.filename : null , userID: req.user._id , priority: req.body.priority  ,  text :req.body.text || ""  , mediaType , media: req.file ? req.file.path : null , userID : req.user._id })  // create todo in database
        
        if(!todo) {

            await deleteImage(req.file.filename , mediaType)

            return res.status(200).send({ success: false , message : "Todo creation failed" })  // send success message to client
        }
 
        return res.status(200).send({ success: true , message : "Todo created successfully" , todo })  // send success message to client

    }catch(error){
            if (req.file) {
                    
                await deleteImage(req.file.filename , req.file.mimetype.split('/')[0] )

                }
        return res.status(400).send({ error: error.message || "Something went wrong" })  // send error message to client
    }
}







module.exports = createTodo