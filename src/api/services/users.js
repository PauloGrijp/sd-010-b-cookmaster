const { createOne, findUser } = require('../models/users');

const createUser = async (name, email, password, role) => {
    const created = await createOne(name, email, password, role);
    return created;
};

const findEmail = async (email) => {
    const user = await findUser(email);
    return user;
};

module.exports = { createUser, findEmail };