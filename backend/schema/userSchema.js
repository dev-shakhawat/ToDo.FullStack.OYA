const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [ true , "Username is required" ],
        unique : [true , "Username already exists , try another with username or login"],
    },
    email : {
        type : String,
        trim : true,
        required : [true , "Email is required"],
        unique : [true , "Email already exists , try another with email or login"],
    },
    password : {
        type : String,
        trim : true,
        required : true,
        minlength : [6 , "Password must be at least 6 characters long"],
    }, 
    isEmailVerified : {
        type : Boolean,
        default : false
    },
    accessToken:{
        type : String, 
        default : ''
    },
    refreshToken : {
        type : String,
        default : ''
    }
    
})




module.exports = mongoose.model('user' , userSchema)