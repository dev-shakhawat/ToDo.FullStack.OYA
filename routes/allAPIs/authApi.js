const express = require('express');
const register = require('../../controllers/auth/register');
const login = require('../../controllers/auth/login');
const authAPI = express.Router();








authAPI.post('/registration' , register)   // user registration api


authAPI.post('/login' , login)   // user login api







module.exports = authAPI