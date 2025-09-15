const express = require('express');
const authAPI = require('./allAPIs/authApi');
const routes = express.Router();







routes.use('/auth' , authAPI)   // auth api's




module.exports = routes