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
    console.log('aqui');
    if (!email) {
        return errorFields;
    }
    const verifyEm = await loginModel.verifyEmail(email);
    if (!verifyEm) {
        return errorPasswordAndEmail;
    }
};

const validatePassword = async (password) => {
    if (!password) {
        console.log('pass n existe');
        return errorFields;
    }
    console.log('entrei no pass');
    const verifyPass = await loginModel.verifyPassword(password);
    if (!verifyPass) {
        console.log('entrei no pass');
        return errorPasswordAndEmail;
    }
};

const doLogin = async (userEmail, password) => {
    const { email, _id } = await loginModel.getUser(userEmail, password);

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
