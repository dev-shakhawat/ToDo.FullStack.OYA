const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [ true , "Username is required" ],
        unique : [true , "Username already exists , try another username or login"]
    },
    email : {
        type : String,
        required : [true , "Email is required"],
        unique : [true , "Email already exists , try another email or login"]
    },
    password : {
        type : String,
        required : true
    }, 
})