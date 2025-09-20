const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [ true , "Username is required" ],
        unique : [true , "Username already exists , try another with username or login"],
        validate: [
            {
                validator: function (v) {
                return /^\S+$/.test(v);  // no spaces allowed
                },
                message: "Username cannot contain spaces"
            },  
            {
            validator: function (v) {
            return /^[A-Za-z.]+$/.test(v);
            },
            message: "Username can only contain letters and dot (.)"
            },
            {
            validator: function(v) {
                // শুরুতে বা শেষেও dot থাকলে false
                return !v.startsWith('.') && !v.endsWith('.');
            },
            message: "Username cannot start or end with a dot"
            },
            {
            validator: function(v) {
                 
                return !/\.\./.test(v);  // miltiple dot not allowed in same place
            },
            message: "Username cannot contain consecutive dots"
            }
        ]
    },
    email : {
        type : String,
        trim : true,
        required : [true , "Email is required"],
        unique : [true , "Email already exists , try another with email or login"],
        validate: [
            {
                validator: function (v) {
                return /^\S+$/.test(v);  // no spaces allowed
                },
                message: "Email cannot contain spaces"
            },   
            {
            validator: function(v) {
                // শুরুতে বা শেষেও dot থাকলে false
                return !v.startsWith('.') && !v.endsWith('.');
            },
            message: "Email cannot start or end with a dot"
            },
            {
            validator: function(v) {
                 
                return !/\.\./.test(v);  // miltiple dot not allowed in same place
            },
            message: "Email cannot contain consecutive dots"
            },
            {
            validator: function(v) {
                // simple email regex
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: "Please enter a valid email address"
            }

        ]
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