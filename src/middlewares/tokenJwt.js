const jwt = require('jsonwebtoken');

const generateToken = async (req, _res, next) => {
    const { email, name } = req.body;
    const secret = '123456';
    const jwtConfiguration = {
        expiresIn: '15h',
        algorithm: 'HS256',
    };
    const token = jwt.sign({ email, name }, secret, jwtConfiguration);
    req.token = { token };
    next();
};

module.exports = generateToken;
