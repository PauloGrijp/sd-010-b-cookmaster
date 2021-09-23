const jwt = require('jsonwebtoken');

const secret = 'naotemsenha';

const validateJWT = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'jwt malformed' });

    try {
        const payload = jwt.verify(token, secret);
        
        req.idUser = payload.data.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'jwt malformed' });
    }
};

module.exports = validateJWT;