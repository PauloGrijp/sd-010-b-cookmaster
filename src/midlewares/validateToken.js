const jwt = require('jsonwebtoken');

const segredo = 'seusecretdetoken';

const validateToken = async (req, res, next) => {
    console.log('entrei no validateToken');
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
        return res.status(401).json({ message: 'missing auth token' });
    }
    try {
        console.log('entrei no try');
         
        console.log('antes decoded');
        const decoded = jwt.verify(authorization, segredo);
         console.log(decoded);
        req.user = decoded.data;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'jwt malformed' });
    }
};

module.exports = { validateToken };