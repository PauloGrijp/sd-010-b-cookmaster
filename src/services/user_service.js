const { newUsers, LoginToken } = require('../models/user_model');

const create = async (name, email, password) => {
    const newUser = await newUsers(name, email, password);

    // console.log(newUser, 'SERVICE');
    return newUser; 
};

const login = async (email, password) => {
    const user = await LoginToken(email, password);
    return user; 
};

module.exports = {
    create,
    login,
};