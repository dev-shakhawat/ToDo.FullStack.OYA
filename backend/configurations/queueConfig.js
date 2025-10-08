const Queue = require('bull');

const queue = new Queue('queue' , {
    redis: {
        host: 'redis-18712.c325.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 18712,
        username: 'default',
        password: '2ct5ZDC2QxWEXUKXir7j8f3ynsFZxX7x'
    }
});

module.exports = queue