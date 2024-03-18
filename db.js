const { MongoClient } = require('mongodb');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url);
async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = { connectToDB };