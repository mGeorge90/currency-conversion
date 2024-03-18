const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        } else {
            req.user = decoded;
            next();
        }
    });
};

module.exports = authMiddleware;
