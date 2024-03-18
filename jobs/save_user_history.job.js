const Queue = require('bull');
const { connectToDB } = require('../db');
const { redis } = require('../config/redis.config')

const saveQueue = new Queue('saveQueue', {
    redis: redis,
});

saveQueue.process(async (job) => {
    const db = await connectToDB();
    const { data } = job.data;
    await db.collection('userHistory').insertOne(data);
});

module.exports = saveQueue;