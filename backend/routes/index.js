const express = require('express');
const authAPI = require('./allAPIs/authApi');
const todoAPI = require('./allAPIs/todoApi');
const healthAPI = require('./allAPIs/healthCkeck');
const routes = express.Router();






routes.use('/auth' , authAPI)   // auth api's


routes.use('/todo' , todoAPI)   // todo api's


routes.use('/health' , healthAPI)   // todo api's




module.exports = routes