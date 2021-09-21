const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const modelsUsers = require('../models/users');

const secret = 'mysecretexample';

const validateJWT = async (req, res, next) => {
try {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });
    }
    
    const decoded = jwt.verify(token, secret);
    const user = await modelsUsers.findEmail(decoded.email);
    const { _id, role } = user;
    req.user = _id;
    req.role = role;
    next();
} catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'jwt malformed' });
}
};

module.exports = validateJWT;
