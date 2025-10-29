const Queue = require('bull');

const queue = new Queue('queue' , {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD
    }
});

module.exports = queue 