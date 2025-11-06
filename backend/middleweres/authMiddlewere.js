const jwt = require('jsonwebtoken')
const userSchema = require('../schema/userSchema')



async function authMiddlewere(req , res , next) { 
    
    try{ 
        
        const header = req.headers.authorization  // get header from request
         
          
        if(!header) return res.status(400).send({ success: false , message : "Authentication failed" })  // header not found
        
        const token = header.split(" ")[1]  // get token from header

        const cookie = req.cookies.refreshToken  // get cookie from request

        if(!token && !cookie) return res.status(400).send({ success: false , message : "Authentication failed" })  // token not found
        
        // find user in database
        const user = await userSchema.findOne({ refreshToken : cookie })

        if(!user) return res.status(400).send({ success: false , message : "Authentication failed or user not found " })  // user not found


        // verify token 
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (error , decodedToken)=>{ 

            if(error) return res.status(400).send({ success: false , message : "Authentication failed" })  // token not valid

            req.user = decodedToken

            next()
            
        })  

    }catch(error){
        return res.status(400).send({ error: error.message || "Authentication failed" })  // send error message to client
    }
}



module.exports = authMiddlewere