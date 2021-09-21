const usersModel = require('../models/userModel');

const existField = (email, password) => {
    if (!email || !password) {
      return false;
    }
    return true;
};
const isValidEmail = (email) => {
    const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (!regexEmail.test(email)) {
        return false;
    }
    return true;
};

const login = ({ email, password }) => {
    const fieldsExists = existField(email, password);
    const validEmail = isValidEmail(email);
    if (!fieldsExists) {
        return { message: 'All fields must be filled' }; 
    }
    if (!validEmail) {
        return { message: 'Incorret username or password' }; 
    }
};

module.exports = { login };