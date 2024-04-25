const jwt = require('jsonwebtoken');
require('dotenv').config();

const getTokenFromHeader = (req) => {
    return req.header('auth-token');
};

const authenticateToken = (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (!token) {
        return res.status(401).json({ success: false, errors: 'No token, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(`Token verification failed: ${e.message}`);  
        res.status(401).json({ success: false, errors: 'Token is not valid' });
    }
};

module.exports = authenticateToken;