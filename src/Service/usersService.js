const usersModel = require('../Model/usersModel');
const validations = require('../validations/validations');

const getAll = async () => {
    const users = await usersModel.getAll();
    return users;
};
const createUser = async (user) => {
    const { email } = user;
    if (validations.allInfos) return false;
    if (!validations.validEmail(email)) return false;
    if (!usersModel.userExists(email)) return false;
    const response = await usersModel.create(user);
    return response;
};

module.exports = { createUser, getAll };