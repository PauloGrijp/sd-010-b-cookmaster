const { getUserByEmail, getUserPassword } = require('../model/usersModel');

let err;
const conflictError = 409;

const validateEmailExist = async (email, res) => {
    const user = await getUserByEmail(email);
    if (user) {
        err = { message: 'Email already registered' };
        res.status(conflictError).json(err);
    }
};

const validatePassword = async (password, email) => {
    const user = await getUserPassword(password, email);
    return user;
};

module.exports = { validateEmailExist, validatePassword };