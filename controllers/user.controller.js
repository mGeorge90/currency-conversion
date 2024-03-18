const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {connectToDB} = require('../db');

async function registerUser(req, res) {
    console.log('req.body', req.body);
    try {
        const db = await connectToDB();
        const userData = req.body;
        userData.password = await bcrypt.hash(userData.password, 10);
        const user = await db.collection('users').insertOne(userData);

        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ userId: user.insertedId }, secretKey, { expiresIn: '1d' });

        res.status(200).json({
            message: 'User registered successfully',
            data: { token: token }
        });
    } catch (error) {
        // Handle error
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function loginUser(req, res) {
    try {
        const db = await connectToDB();
        const { email, password } = req.body;
        // Find the user in the database
        const user = await db.collection('users').findOne({ email });
        console.log('user', user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('passwordMatch', password, user.password, passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET);
        res.json({ message: 'User authenticated successfully', data: { token } });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
};
