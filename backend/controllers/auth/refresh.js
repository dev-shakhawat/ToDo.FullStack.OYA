const userSchema = require("../../schema/userSchema")
const jwt = require("jsonwebtoken")


async function refreshController(req , res){
    try{  
  

         const token = req.cookies.refreshToken  // get token from cookie 

         if(!token) return res.status(400).send({ success: false , message : "Invalid token" })  // token not found 

         const user = userSchema.findOne({ refreshToken : token })  // find user in database

         if(!user) return res.status(400).send({ success: false , message : "Invalid token" })  // user not found

         // verify token
         jwt.verify(token , process.env.REFRESH_TOKEN_SECRET , (err , decodedToken) => {

             if(err) return res.status(400).send({ success: false , message : "Invalid token" })  // token not valid

             // access token generate
             const accessToken = jwt.sign({ _id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

             return res.status(200).send({ success: true ,  accessToken })  // send success message to client
        })

    }catch(error){
        res.status(400).send({ error: error.message || "Something went wrong" })  // send error message to client
    }
}


module.exports = refreshController