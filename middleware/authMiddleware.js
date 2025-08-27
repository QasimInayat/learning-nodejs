const jwt = require('jsonwebtoken');


function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer token"

    if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

    try {
        const decoded = jwt.verify(token, 'jwt_secret_key'); // TODO: move to .env
        req.user = decoded; // store user info
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;