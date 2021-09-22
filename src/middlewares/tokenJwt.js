const jwt = require('jsonwebtoken');

const { getByEmail } = require('../models/userModel');

const generateToken = async (req, _res, next) => {
    const { email } = req.body;
    const secret = '123456';
    const jwtConfiguration = {
        expiresIn: '15h',
        algorithm: 'HS256',
    };
    const { _id, name } = await getByEmail(email);
    const token = jwt.sign({ _id, name, email }, secret, jwtConfiguration);
    req.token = { token };
    next();
};

module.exports = generateToken;
