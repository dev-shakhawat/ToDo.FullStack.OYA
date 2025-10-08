const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User ID is required"],
    },
    text: {
        type: String,
        trim: true,
        required: [true, "Text is required"],
    },
    media : {
        type : String,
        trim : true, 
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