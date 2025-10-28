const express = require("express"); 
const healthAPI = express.Router();
const cloudinary = require("../../configurations/cloudinaryConfig");
const Redis = require('ioredis') 
const mongoose = require('mongoose');




const redis = new Redis({
  host: 'redis-15856.c98.us-east-1-4.ec2.redns.redis-cloud.com', 
  port: 15856, 
  username: 'default',
  password: 'KPDfSq0pvBlJdMN2qHg8j5Up10jdB335'
});

redis.on('error', (err) => console.log('Redis Client Error', err)) 



healthAPI.get('/check', async (req, res) => {

    const health = {
        status: "ok",
        timeStamp: Date.now(),
        upTime: process.uptime(),
        services: {
            mongodb: '', 
            redis: '',
            cloudinary: ''
        }, 
    }

    try {
        
        // set database connection
        const dbState = await mongoose.connection.readyState;
        health.services.mongodb = dbState === 1 ? 'connected' : 'disconnected' 
        

        // set cloudinary connection
        const cloudinaryResponse = await cloudinary.api.ping()
        health.services.cloudinary = cloudinaryResponse.status 

        // set redis connection
        health.services.redis = redis.status 
        
    } catch (error) {
        health.services.mongodb = 'disconnected'
        
    }
 
    return res.status(200).send(health)
    
});

module.exports = healthAPI;
