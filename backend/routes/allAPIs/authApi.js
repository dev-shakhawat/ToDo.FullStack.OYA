const express = require("express");
const register = require("../../controllers/auth/register");
const login = require("../../controllers/auth/login");
const refreshController = require("../../controllers/auth/refresh");
const forgetPass = require("../../controllers/auth/forgetPass");
const resetPassword = require("../../controllers/auth/resetPass");
const emailVerify = require("../../controllers/auth/tokenVerify");
const authAPI = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User Authentication
 */

/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: use for new user registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Registered successfully, please check your email for verification
 * 
 *       400:
 *         description: User registration failed
 */

authAPI.post("/registration", register); // user registration api

authAPI.post("/login", login); // user login api

authAPI.get("/email-verify/:token", emailVerify); // user token verify api

authAPI.post("/refresh", refreshController); // user token verify api

authAPI.post("/forget-password", forgetPass); // user token verify api

authAPI.post("/reset-password/:token", resetPassword); // user token verify api

module.exports = authAPI;
