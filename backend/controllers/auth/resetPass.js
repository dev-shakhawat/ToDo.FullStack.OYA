
const jwt = require("jsonwebtoken")
const userSchema = require("../../schema/userSchema")
const argon = require("argon2")


async function resetPassword(req , res){
    try{

        const { password } = req.body  // get password from request body
        const { token } = req.params  // get token from request params

        if(password.trim().length < 6) return res.status(400).send({ success: false , message : "Password must be at least 6 characters long" })

        const decodedToken = jwt.verify(token , process.env.FORGET_PASS_TOKEN_SECRET)  // decode token

        const user = await userSchema.findById(decodedToken._id)  // update user in database

        if(!user) return res.status(400).send({ success: false , message : "Invalid token" })  // user not found

        const passwordHash = await argon.hash(password)  // hash password

        user.password = passwordHash  // update password in database

        await user.save()  // save user in database

        return res.status(200).send({ success: true , message : "Password reset successfully" })  // send success message to client

    }catch(error){
        res.status(400).send({ error: error.message || "Password reset failed" })  // send error message to client
    }
}



module.exports = resetPassword