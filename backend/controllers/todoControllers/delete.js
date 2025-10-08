const todoSchema = require('../../schema/todoSchema')
const fs = require("fs");


async function deleteTodo(req , res){

    try{

        const { id } = req.params  // get id from request params

        const todo = await todoSchema.findOne({ _id : id  , userID: req.user._id})  // find todo in database

        if(!todo) return res.status(400).send({ success: false , message : "Todo not found" })  // todo not found

        if(todo.media){
            
            // media base name 
            const filePath = todo.media.split("/").slice(3).join("/");
            
            if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); 
            }
        }

        await todoSchema.findByIdAndDelete(id)  // delete todo in database

        return res.status(200).send({ success: true , message : "Deleted successfully" })  // send success message to client

    }catch(error){
        return res.status(400).send({ error: error.message || "Something went wrong" })  // send error message to client
    }
}


module.exports = deleteTodo