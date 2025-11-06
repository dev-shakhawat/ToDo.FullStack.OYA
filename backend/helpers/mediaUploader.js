const Busboy = require("busboy");
const cloudinary = require("../configurations/cloudinaryConfig");

const mediaUploader = (req, res, next) => {

  // console.log(req.user);
  

  const busboy = new Busboy({ headers: req.headers });

  req.body = {};
  busboy.on("field", (fieldname, val) => {
    req.body[fieldname] = val;  
  });

  let fileUpload = false;

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {

    fileUpload = true;

    
    const stream = cloudinary.uploader.upload_stream(

      { folder: "todoFullStackOYA", resource_type: "auto" },

      (err, result) => {
        if (err) {
          console.error("Cloudinary error:", err);
          return res.status(500).json({ error: err.message });
        }
 
        req.file = {
          url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
          mimetype,
        };
 
 
        next();
      }
    );
 
    file.pipe(stream);
  });

  busboy.on("finish", () => { 

    if (fileUpload == false) next();

  });

  req.pipe(busboy);
};

module.exports = mediaUploader;
