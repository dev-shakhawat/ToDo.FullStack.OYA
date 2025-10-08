const argon = require('argon2');
const userSchema = require('../../schema/userSchema');
const jwt = require('jsonwebtoken');

async function login(req , res){

    
    try{

        const { email , password } = req.body // get email and password from request body
 
        const mailPattern = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/

        if(!email)  return res.status(400).send({ success: false , message : "Email is required" })  // set email error

        if(email && !mailPattern.test(email))  return res.status(400).send({ success: false , message : "Please enter a valid email address" })  // set email error

        if(!password)  return res.status(400).send({ success: false , message : "Password is required" })  // set password error


        const user = await userSchema.findOne({ email })  // find user in database

        if(!user) return res.status(400).send({ success: false , message : "Invalid credentials" })  // user not found
        

        // user not verified
        if(!user.isEmailVerified) return res.status(400).send({ success: false , message : "Please verify your account" }) // user not verified

        const isPasswordMatch = await argon.verify(user.password , password)  // verify password

        if(!isPasswordMatch) return res.status(400).send({ success: false , message : "Invalid credentials" })  // password not match

        // refresh token generate
        const refreshToken = jwt.sign({ _id: user._id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

        await userSchema.findByIdAndUpdate(user._id , { refreshToken })  // update user in database

        const accessToken =  jwt.sign({ _id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 365 * 24 * 60 * 60 * 1000
        });

        return res.status(200).send({ success: true , message : "Login successfully" , userName: user.username , email: user.email  , accessToken })



    }catch(error){

        res.status(500).send({ success: false , message : error.message || "login failed" })

    }

}



module.exports = login