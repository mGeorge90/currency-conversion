const { body, validationResult } = require('express-validator');

exports.validateUserRegistration = [
    // Validate email
    body('email').notEmpty().isEmail().withMessage('Please provide a valid email address'),

    // Validate password
    body('password').notEmpty().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    // Validate name
    body('name').notEmpty().isString().withMessage('Please provide your name'),

    // Check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];