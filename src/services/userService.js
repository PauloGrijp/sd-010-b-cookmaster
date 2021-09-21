const usersModel = require('../models/userModel');

const existField = (name, email, password) => {
    if (!name || !email || !password) {
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

const create = async ({ name, email, password, role }) => {
    const existFields = existField(name, email, password);
    const validEmail = isValidEmail(email);
    const existingEmail = await usersModel.findByEmail(email);
    if (!existFields || !validEmail) {
      return { message: 'Invalid entries. Try again.' }; 
    }
    if (existingEmail) return { message: 'Email already registered' }; 
    const { id } = await usersModel.create({ name, email, password, role });
    return { id, name, email, password, role };
};

module.exports = { create };
