const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_KEY);
        req.userEmail = decoded.userEmail;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}


module.exports = verifyToken;