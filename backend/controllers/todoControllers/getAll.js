const todoSchema = require('../../schema/todoSchema')



async function getAllTodo(req , res){

    try{

        const todos = await todoSchema.find({ userID : req.user._id })  // find todo in database

        return res.status(200).send({ success: true , message : "Todo fetched successfully" , todos })  // send success message to client

    }catch(error){
        res.status(400).send({ error: error.message || "Something went wrong" })  // send error message to client
    }

}


module.exports = getAllTodo