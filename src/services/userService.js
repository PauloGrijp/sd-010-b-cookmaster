const usersModel = require('../models/userModel');

const existField = (field) => {
    if (!field) {
      return false;
    }
    return true;
};

const isValidEmail = (email) => {
    const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    if (!email.match(regexEmail)) {
        return false;
    }
    return true;
};

const create = async ({ name, email, password }) => {
    // const existingEmail = await usersModel.findByEmail(email);
    if (!existField || !isValidEmail) {
      return { message: 'Invalid entries. Try again' }; 
    }
    // if (existingEmail) return { message: 'Email already exists' }; 
    const { id } = await usersModel.create({ name, email, password });
    return { id, name, password };
};

module.exports = { create };
