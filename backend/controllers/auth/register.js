const argon = require('argon2');
const sendUserMail = require('../../helpers/sendMail');  
const userSchema = require('../../schema/userSchema');
const jwt = require('jsonwebtoken');


async function register(req, res) {
    try{
        const { username , email, password } = req.body; 

        const passwordHash = await argon.hash(password);  // hash password

        
        const user = await userSchema.create({ username , email , password: passwordHash })  // create user in database
        
        if(user){
            // access token generate
            const accessToken = jwt.sign({ _id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' }); 
            
            // verification link
            const link = `${process.env.CLIENT_URL}/verify/${accessToken}`;

            await sendUserMail(email , "Account Verification" , `<h2>Please click <a href="${link}">verify your account</a> to complete your registration  </h2>`)  // send mail to user

            return res.status(200).send({ success: true , message : "Registered successfully , please check your email for verification " })  // send success message to client
        }
        
    }catch(error){
        res.status(400).send({ error: error.message || "user registration failed" })  // send error message to client
    }
}


module.exports = register