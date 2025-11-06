const todoSchema = require('../../schema/todoSchema')



async function getAllTodo(req , res){
    
    console.log(req.user);
    

    try{
        
        const {page = 1 , limit = 10 , type , search} = req.query  // get page , limit , type , search from request query

        const query = { userID: req.user._id }

        if(type) query.mediaType = type  // add mediaType to query

        if(search) query.text = { $regex: search, $options: 'i' } // add text to query

        const todos = await todoSchema.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit)  // find todos in database
        
        const totalItems = await todoSchema.countDocuments(query)  // count todos in database

        const totalPages = Math.ceil(totalItems / limit)  // calculate total pages

        return res.status(200).send({ page : Number(page) , limit: Number(limit), totalItems , totalPages  , todos })  // send success message to client

    }catch(error){
        res.status(400).send({ error: error.message || "Something went wrong" })  // send error message to client
    }

}


module.exports = getAllTodo