const jwt = require('jsonwebtoken');

const segredo = 'seusecretdetoken';

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'missing auth token' });
    }
    try {
        const decoded = jwt.verify(authorization, segredo);

        req.user = decoded.data;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'jwt malformed' });
    }
};

module.exports = { validateToken };