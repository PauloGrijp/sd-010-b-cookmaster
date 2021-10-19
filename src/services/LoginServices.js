const Model = require('../models');

const FIELDS_ERROR = {
    err: { 
        status: 401,
        message: 'All fields must be filled',
    } 
}
const INCORRECT_CODE = {
    err: { 
        status: 401,
        message: 'Incorrect username or password',
    } 
}
const loginValidator = (email, password) => {
    if (!email || !password) return true;
}

const emailValidator = async (email, password) => {
    const getEmail = await Model.users.getByEmail(email);

    if (email !== getEmail || password !== getEmail.password) return true;
}

const login = async (email, password) => {
    if (loginValidator(email, password)) return FIELDS_ERROR;

    if (await emailValidator(email, password)) return INCORRECT_CODE;

    const user = await Model.login.login(email, password);

    return user;
}

module.exports = {
    login,
}