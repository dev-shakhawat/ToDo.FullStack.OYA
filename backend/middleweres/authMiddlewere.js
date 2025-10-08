const jwt = require('jsonwebtoken')



async function authMiddlewere(req , res , next) {
    try{

        const header = req.headers.authorization  // get header from request
        
        
        if(!header) return res.status(400).send({ success: false , message : "Authentication failed 11" })  // header not found
        
        const token = header.split(" ")[1]  // get token from header
        

        // verify token 
        jwt.verify(token , process.env.REFRESH_TOKEN_SECRET , (error , decodedToken)=>{

            if(error) return res.status(400).send({ success: false , message : "Authentication failed 19" })  // token not valid

            req.user = decodedToken

            next()
            
        })  

    }catch(error){
        return res.status(400).send({ error: error.message || "Authentication failed 26" })  // send error message to client
    }
}



module.exports = authMiddlewere