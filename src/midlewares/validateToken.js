const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    // console.log(req.headers);
    const segredo = 'seusecretdetoken';
    if (!authorization) {
        return res.status(401).json({ message: 'jwt malformed' });
    }
    try {
        const decoded = jwt.verify(authorization, segredo);
        console.log(decoded);
        req.user = decoded.data;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'jwt malformed' });
    }
};

module.exports = { validateToken };