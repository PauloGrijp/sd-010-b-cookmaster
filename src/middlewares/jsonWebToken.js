const jwt = require('jsonwebtoken');

const generateJwtToken = async (req, res, next) => {
    const { email, name } = req.body;
    const secret = 'mysecretexample';
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    const token = jwt.sign({ email, name }, secret, jwtConfig);

    req.token = { token };

    next();
};

module.exports = generateJwtToken;
