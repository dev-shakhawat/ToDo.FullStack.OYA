const Busboy = require("busboy");
const cloudinary = require("../configurations/cloudinaryConfig");

const mediaUploader = (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });

  req.body = {};
  busboy.on("field", (fieldname, val) => {
    req.body[fieldname] = val;  
  });

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    
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
    console.log("Busboy stream finished ");
  });

  req.pipe(busboy);
};

module.exports = mediaUploader;
