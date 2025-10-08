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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: use for user login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successfully
 *
 *       400:
 *         description: login failed
 */

authAPI.post("/login", login); // user login api

/**
 * @swagger
 * /auth/email-verify/{token}:
 *   get:
 *     summary: use for email verification when user registration
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Reset token received in email
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account verified successfully
 *
 *       400:
 *         description: Account verification failed
 */
authAPI.get("/email-verify/:token", emailVerify); // user token verify api

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: use for verify token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            credentials:
 *              type: bolean
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *
 *       400:
 *         description: Something went wrong
 */
authAPI.post("/refresh", refreshController); // user token verify api

/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: use for forget-password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Please check your email for password reset link
 *
 *       400:
 *         description: Something went wrong
 */
authAPI.post("/forget-password", forgetPass); // user token verify api

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Use for reset password
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Reset token received in email
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Password reset failed
 */

authAPI.post("/reset-password/:token", resetPassword); // user token verify api

module.exports = authAPI;
