const jwt = require('jsonwebtoken');

const secret = 'super-senha';

const validateJWT = async (req, res, next) => {
    const auth = req.headers.authorization;
    console.log(auth);

    if (!auth) { 
        console.log('entrei aqui');
        return res.status(401).json({ message: 'jwt malformed' }); 
}

    try {
        const payload = jwt.verify(auth, secret);
        const { _id } = payload.data;
        req.user = _id;
        next();
    } catch (error) {
        console.log('entrei aqui 2', error);
        return res.status(401).json({ message: 'jwt malformed' });
    }
};

module.exports = validateJWT;