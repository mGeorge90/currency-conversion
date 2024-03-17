const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/auth.middleware');
const jwt = require('jsonwebtoken');
/**** Routes ****/
router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.get('/public', (req, res) => {
    const secretKey = process.env.JWT_SECRET;
    console.log('secretKey', secretKey);

// Define payload
    const payload = { userId: '123456', username: 'exampleUser' };

// Generate JWT token
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return res.json({ token });
});


router.get('/protected', authMiddleware, (req, res) => {
    res.send('Protected route');
});

module.exports = router;