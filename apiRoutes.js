const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/auth.middleware');
const jwt = require('jsonwebtoken');
const userController = require('./controllers/user.controller');
/**** Routes ****/
router.get('/__health', (req, res) => {
    res.send('I am healthy!');
});

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);


module.exports = router;