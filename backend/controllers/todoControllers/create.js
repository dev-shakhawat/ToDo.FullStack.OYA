const todoSchema = require('../../schema/todoSchema')
const path = require("path");
const fs = require("fs"); 



async function createTodo(req , res){
 
    
    
    try{
 
 
        
        const text = req.body.text  // get text from request body

        if(!text) return res.status(400).send({ success: false , message : "Text is required" })  // set text error

        let mediaType = null ; 

        if(req.file){

            mediaType = req.file.mimetype.split('/')[0] 

        }

        const todo = await todoSchema.create({ userID: req.user._id ,  text , mediaType , media: req.file ? req.file.path : null , userID : req.user._id })  // create todo in database
        
        if(!todo) {

            if (req.file) {
                    const filePath = path.join(__dirname, "../../" , req.file.path); 
                    if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); 
                    }
                }

            return res.status(200).send({ success: false , message : "Todo creation failed" })  // send success message to client
        }
 
        return res.status(200).send({ success: true , message : "Todo created successfully" , todo })  // send success message to client

    }catch(error){
            if (req.file) {
                    const filePath = path.join(__dirname,  "../../" , req.file.path); 
                    if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); 
                    }
                }
        return res.status(400).send({ error: error.message || "Something went wrong" })  // send error message to client
    }
}







module.exports = createTodo