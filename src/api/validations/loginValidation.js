const loginModel = require('../models/loginModel');

const errors = {
    invalidEntries: 'All fields must be filled',
    incorrectEntries: 'Incorrect username or password',
};

const EMAIL_REG = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkLoginEntries = (email, password) => {
    if (!email || !password) return { message: errors.invalidEntries };
    return {};
};

const checkEmailFormat = (email) => {
    if (!EMAIL_REG.test(email)) return { message: errors.incorrectEntries };
    return {};
};

const verifyLoginData = async (email, password) => {
    const response = await loginModel.checkLogin(email, password);
    if (response.loginError) return { message: errors.incorrectEntries };
    return {};
};

module.exports = {
    checkLoginEntries,
    checkEmailFormat,
    verifyLoginData,
};
