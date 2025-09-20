const sendUserMail = require("../../helpers/sendMail")
const userSchema = require("../../schema/userSchema")
const jwt = require("jsonwebtoken")




async function forgetPass(req , res){
    try{

        const { email } = req.body  // get email from request body

        const mailPattern = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/

        if(!email)  return res.status(400).send({ success: false , message : "Email is required" })  // set email error

        if(email && !mailPattern.test(email))  return res.status(400).send({ success: false , message : "Please enter a valid email address" })  // set email error

        const user = await userSchema.findOne({ email })  // find user in database

        if(!user) return res.status(400).send({ success: false , message : "Account not found" })  // user not found

        // access token generate
        const forgotToken = jwt.sign({ _id: user._id}, process.env.FORGET_PASS_TOKEN_SECRET, { expiresIn: '10m' });

        // verification link
        const link = `${process.env.CLIENT_URL}/resetPass/${forgotToken}`;

        await sendUserMail(email , "Forgot Password" , `<h2>Please click <a href="${link}">reset password</a> to complete your password reset.  </h2>`)  // send mail to user

        return res.status(200).send({ success: true , message : "Please check your email for password reset link" })  // send success message to client

    }catch(error){
       return res.status(400).send({ error: error.message || "Somthing went wrong" })
    }
}


module.exports = forgetPass