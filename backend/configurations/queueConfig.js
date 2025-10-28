const Queue = require('bull');

const queue = new Queue('queue' , {
    redis: {
        host: 'redis-15856.c98.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 15856,
        username: 'default',
        password: 'KPDfSq0pvBlJdMN2qHg8j5Up10jdB335'
    }
});

module.exports = queue