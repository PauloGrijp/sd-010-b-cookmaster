const usersModel = require('../models/UsersModel');

const errorMessage = {
    message: 'Invalid entries. Try again.',
};

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateEmailExists = async (email) => {
    const valida = await usersModel.verifyIfEmailAlreadyExists(email);
    if (valida) {
        return {
            message: 'Email already registered',
        };
    }
};

const validatePasswordNameAndEmail = async (name, email, password) => {
    if (!name) {
        // console.log('name');
        return errorMessage;
    }
    if (!email || !email.match(emailRegex)) {
        // console.log('email regex');
        return errorMessage;
    }
    if (!password) {
        // console.log('pass');
        return errorMessage;
    }
};

const addNewUser = async (name, email, password) => {
    const addUser = await usersModel.addNewUser(name, email, password);
    console.log(addUser);
    return addUser;
};

module.exports = {
    validatePasswordNameAndEmail,
    validateEmailExists,
    addNewUser,
};
