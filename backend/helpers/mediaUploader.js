const multer  = require('multer')  
const cloudinary = require("../configurations/cloudinaryConfig");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'todoFullStackOYA',
    resource_type: 'auto',
    allowed_formats:  [ 'png', 'jpg', 'jpeg' , 'gif' , 'webp'  , 'mp4' ], // supports promises as well 
  },
});


const upload = multer({ storage: storage })



module.exports = upload