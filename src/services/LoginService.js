const jwt = require('jsonwebtoken');
const loginModel = require('../models/LoginModel');

const secret = 'minhasupersenha';

const errorPasswordAndEmail = {
    message: 'Incorrect username or password',
};

const errorFields = {
    message: 'All fields must be filled',
};

const validateEmailAndPassword = async (email, password) => {
    const verifyEm = await loginModel.verifyEmailAndPassword(email, password);
    if (!email) {
        console.log('entrei no email');
        return errorFields;
    }
    if (!password) {
        console.log(`Passei aqui no ${errorFields}`);
        return errorFields;
    }
    if (!verifyEm) {
        console.log('entrei no verify');
        return errorPasswordAndEmail;
    }
};

// const validatePassword = async (password) => {
//     if (!password) {
//         console.log(`Passei aqui no ${errorFields}`);
//         return errorFields;
//     }
//     const verifyPass = await loginModel.verifyPassword(password);
//     if (!verifyPass) {
//         console.log(`Incorrect ${verifyPass}`);
//         console.log(`Error do password: ${errorPasswordAndEmail}`);
//         return errorPasswordAndEmail;
//     }
// };

const doLogin = async (userEmail, password) => {
    const { email, _id } = await loginModel.getUser(userEmail, password);
    // console.log(email, _id);

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
    validateEmailAndPassword,
    // validatePassword,
    doLogin,
};
