const upload = require("../helpers/mediaUploader");

async function mediaUploadMiddlewere(req, res, next) {
  try {

    

     console.log('11' , req);
     

  } catch (error) {
    return res
      .status(400)
      .send({ error: error.message || "Something went wrong" }); // send error message to client
  }
}

module.exports = mediaUploadMiddlewere;
