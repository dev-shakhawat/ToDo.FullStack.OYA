const todoSchema = require('../../schema/todoSchema')
const path = require("path");
const fs = require("fs");


async function updateTodo(req , res){

    try{

        const { id } = req.params  // get id from request params
        
 
        
        const todo = await todoSchema.findOne({ _id : id  , userID: req.user._id})  // find todo in database

        if(!todo) return res.status(400).send({ success: false , message : "Todo not found" })  // todo not found

        if(req.body.text) {

            todo.text = req.body.text  // update text in database
        }

        if(req.body.priority) todo.priority = req.body.priority  // update priority in database

        if (req.body.hasOwnProperty("isCompleted")) todo.isCompleted = req.body.isCompleted  // update isCompleted in database



        if(req.file){
            
            if(todo.media){
                const filePath = path.join(__dirname, "../../" , todo.media); 
                if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); 
                }
            }

            todo.mediaType = req.file.mimetype.split('/')[0]  // update mediaType in database
            todo.media = `${req.protocol}://${req.host}/${req.file.path}`  // update media in database
        }

        await todo.save()  // save todo in database

        return res.status(200).send({ success: true , message : "Updated successfully" , todo })  // send success message to client
 
    }catch(error){
        res.status(400).send({ error: error.message || "Something went wrong" })  // send error message to client
    }

}



module.exports = updateTodo