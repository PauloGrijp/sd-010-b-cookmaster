const jwt = require('jsonwebtoken');
const loginModel = require('../models/LoginModel');

const secret = 'minhasupersenha';

const errorPasswordAndEmail = {
    message: 'Incorrect username or password',
};

const errorFields = {
    message: 'All fields must be filled',
};

const validateEmail = async (email) => {
    if (!email) {
        return errorFields;
    }
    const verifyEm = await loginModel.verifyEmail(email);
    if (!verifyEm) {
        return errorPasswordAndEmail;
    }
};

const validatePassword = async (email, password) => {
    if (!password) {
        return errorFields;
    }
    const verifyPass = await loginModel.verifyPassword(email, password);
    if (!verifyPass) {
        console.log(`Incorrect ${verifyPass}`);
        return errorPasswordAndEmail;
    }
};

const doLogin = async (userEmail, password) => {
    const { email, _id } = await loginModel.getUser(userEmail, password);
    console.log(email, _id);

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };

    const payload = {
        id: _id,
        email,
        role: 'user',
    };

    const token = jwt.sign({ data: payload }, secret, jwtConfig);

    return token;
};

module.exports = {
    validateEmail,
    validatePassword,
    doLogin,
};
