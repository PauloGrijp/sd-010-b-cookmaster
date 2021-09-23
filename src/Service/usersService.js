const usersModel = require('../Model/usersModel');
const validations = require('../validations/validations');

const getAll = async () => {
    const users = await usersModel.getAll();
    return users;
};
const createUser = async (user) => {
    const { email } = user;
    if (await usersModel.userExists(email)) return 'email_exist';
    if (!validations.allInfos(user)) return false;
    if (!validations.validEmail(email)) return false;
    const response = await usersModel.create(user);
    return response;
};
const createUserAdmin = async (users, newUser) => {
    const { email } = users;

    if (await usersModel.getRoleByEmail(email) !== 'admin') return 'is_not_admin';

    const response = await usersModel.createNewAdmin(newUser);
     return response;
};

module.exports = { createUser, getAll, createUserAdmin };