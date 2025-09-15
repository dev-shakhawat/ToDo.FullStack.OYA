const argon = require('argon2');
const sendUserMail = require('../../helpers/sendMail'); 
const mongoose = require('mongoose');
const userSchema = require('../../schema/userSchema');


async function register(req, res) {
    try{
        const { username , email, password } = req.body; 

        const passwordHash = await argon.hash(password);  // hash password
        
        const user = await userSchema.create({ username , email , password: passwordHash })  // create user in database

        if(user){
            const otp = mongoose.Types.ObjectId().toString().slice(0 , 8)  // generate otp
            await sendUserMail(email , "Account Verification" , otp)  // send mail to user
            return res.status(200).send({ success: true , message : "user registered successfully" , user })  // send success message to client
        }
        
        
    }catch(error){
        res.status(400).send({ error: error.message || "user registration failed" })  // send error message to client
    }
}


module.exports = register