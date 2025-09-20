const express = require('express');
const register = require('../../controllers/auth/register');
const login = require('../../controllers/auth/login'); 
const refreshController = require('../../controllers/auth/refresh');
const forgetPass = require('../../controllers/auth/forgetPass');
const resetPassword = require('../../controllers/auth/resetPass');
const emailVerify = require('../../controllers/auth/tokenVerify');
const authAPI = express.Router();





authAPI.post('/registration' , register)   // user registration api


authAPI.post('/login' , login)   // user login api


authAPI.get('/emailVerify/:token' , emailVerify)   // user token verify api


authAPI.post('/refresh' , refreshController)   // user token verify api


authAPI.post('/forgetPass' , forgetPass)   // user token verify api


authAPI.post('/resetPass/:token' , resetPassword)   // user token verify api






module.exports = authAPI