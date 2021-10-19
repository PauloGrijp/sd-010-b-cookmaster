const Model = require('../models');

const INVALID_ERROR = {
    err: {
        status: 401,
        message: 'Invalid entries. Try again.',
    }
}

const EXISTS_ERROR = {
    err: {
        status: 401,
        message: 'Email already registered',
    }
}

const createValidator = (name, email, password) => {
    if (!name || !email || !password) {
        return true;
    }
};

const emailValidator = (email) => {
    const emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;
    return  emailRegex.test(email);
};

const alreadyValidator = async (email) => {
    const user = await Model.users.getByEmail(email);
    return user;
};

const createItem = async (name, email, password) => {
    if (createValidator(name, email, password)) return INVALID_ERROR;

    if (!emailValidator(email)) return INVALID_ERROR;

    if (await alreadyValidator(email)) return EXISTS_ERROR;;

    const user = await Model.users.createItem(name, email, password);

    return user;
};

module.exports = {
    createItem,
};