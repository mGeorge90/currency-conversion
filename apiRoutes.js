const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/auth.middleware');
const jwt = require('jsonwebtoken');
const userController = require('./controllers/user.controller');
const currencyController = require('./controllers/currency.controller');
/**** Routes ****/
router.get('/__health', (req, res) => {
    res.send('I am healthy!');
});

router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.loginUser);
router.get('/user/history', authMiddleware, userController.getUserHistory);

router.get('/convert', authMiddleware, currencyController.convert);


module.exports = router;