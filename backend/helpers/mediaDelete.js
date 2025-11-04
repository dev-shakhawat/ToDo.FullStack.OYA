const cloudinary = require("../configurations/cloudinaryConfig");

const deleteImage = async (publicId , type) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId , { resource_type: type });  
    return result;
  } catch (error) {
    console.error( error);
    throw error;
  }
};

module.exports = deleteImage;
