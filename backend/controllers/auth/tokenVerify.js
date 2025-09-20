const jwt = require('jsonwebtoken');
const userSchema = require('../../schema/userSchema');

async function emailVerify(req , res){ 

    try{

        const { token } = req.params  // get token from request params

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)  // decode token

        const user = await userSchema.findByIdAndUpdate(decodedToken._id , { isEmailVerified : true })  // update user in database

        if(!user) return res.status(400).send({ success: false , message : "Invalid token" })  // user not found
        
        return res.status(200).send({ success: true , message : "Account verified successfully" })  // send success message to client

    }catch(error){
        res.status(400).send({ error: error.message || "user registration failed" })  // send error message to client
    }
}



module.exports = emailVerify