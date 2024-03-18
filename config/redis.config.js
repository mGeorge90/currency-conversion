module.exports = {
    redis: {
        host: process.env.REDIS_HOST || 'redis://redis:6379',
        port: process.env.REDIS_PORT || 6379,
    }
};