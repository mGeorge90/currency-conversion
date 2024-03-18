const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/auth.middleware');
const userController = require('./controllers/user.controller');
const currencyController = require('./controllers/currency.controller');
const {body} = require("express-validator");
const { validateUserRegistration} = require('./middlewares/userRegisterValidator.middleware');
const { validateUserLogin } = require('./middlewares/userLoginValidator.middleware');
/**** Routes ****/
router.get('/__health', (req, res) => {
    res.send('I am healthy!');
});

router.post('/user/register', validateUserRegistration, body('email').notEmpty().isEmail(),userController.registerUser);
router.post('/user/login', validateUserLogin, userController.loginUser);
router.get('/user/history', authMiddleware, userController.getUserHistory);

router.get('/convert', authMiddleware, currencyController.convert);


module.exports = router;