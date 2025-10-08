const express = require('express')
const multer  = require('multer') 
const mongoose = require('mongoose')

 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
 
 
      const extentionName = file.originalname.split('.').pop()
      const uniqueID = new mongoose.Types.ObjectId().toString() 
    cb(null, uniqueID + '-' + Date.now() + '.' + extentionName)

  }
})

const upload = multer({ storage: storage })


module.exports = upload