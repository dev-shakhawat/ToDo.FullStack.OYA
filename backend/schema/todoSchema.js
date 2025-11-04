const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User ID is required"],
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
    text: {
        type: String,
        default: '',
    },
    media : {
        type : String,
        trim : true, 
    },
    mediaPublicID:{
        type : String, 
    },
    mediaType : {
        type : String,
        enum: ['video', 'image' , null],
        default :null,
    },
    isCompleted : {
        type : Boolean,
        default : false
    }, 
    
    } , {
        timestamps: true
    });
    
    module.exports =  mongoose.model("todo" , todoSchema)