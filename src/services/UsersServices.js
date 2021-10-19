const Model = require('../models');

const createValidator = (name, email, password) => {
    if (!name || !email || !password) {
        return {
            status: 400,
            message: 'Invalid entries. Trye again.',
        };
    }
};

const emailValidator = (email) => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const validate = emailRegex.test(email);

    if (!validate) {
        return {
            status: 400,
            message: 'Invalid entries. Try again.',
        };
    }
};

const alreadyValidator = async (email) => {
    const user = await Model.users.getByEmail(email);

    if (user) {
        return {
            status: 409,
            message: 'Email already registered',
        };
    }
};

const createItem = async (name, email, password) => {
    if (createValidator(name, email, password)) return createValidator(name, email, password);

    if (emailValidator(email)) return emailValidator(email);

    if (alreadyValidator(email)) return alreadyValidator(email);

    const user = await Model.users.createItem(name, email, password);

    return user;
};

module.exports = {
    createItem,
};