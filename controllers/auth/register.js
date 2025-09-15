const argon = require('argon2');
const sendUserMail = require('../../helpers/sendMail'); 
const mongoose = require('mongoose');


async function register(req, res) {
    try{
        const { username , email, password , confirmPassword } = req.body;

        const errors = {} // all errors will be stored in this object
        const mailPattern = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/
  
        if(!username)  errors.usernameError = "username is required"  // set username error
 
        if(!email)  errors.emailError = "email is required"  // set email error

        if(email && !mailPattern.test(email))  errors.emailError = "invalid email"  // set email error
 
        if(!password)  errors.passwordError = "password is required"  // set password error
 
        if(!confirmPassword)  errors.confirmPasswordError = "confirm password is required"  // set confirm password error

        // set password and confirm password error
        if(password && confirmPassword && password !== confirmPassword)  errors.confirmPasswordError = "password and confirm password does not match"

        // check if there is any error
        if(Object.keys(errors).length > 0) res.status(400).send({ success: false ,  errors })
        
        const hashedPassword = await argon.hash(password); // hash password for database

        const otp = mongoose.Types.ObjectId().toString().slice(0 , 8); // generate otp

        await sendUserMail(email , "Welcome to ToDo App By Shakhawat" , otp)  // send otp to user mail

        const user = { username , email , password: hashedPassword , otp }  // create user object

        res.status(200).send({ success: true , message: "user registration success" , user })  // send user object to client
        
    }catch(error){
        res.status(400).send({ error: error.message || "user registration failed" })  // send error message to client
    }
}


module.exports = register