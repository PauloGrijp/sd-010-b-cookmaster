const { newUsers } = require('../models/user_model');

const create = async (name, email, password) => {
    const newUser = await newUsers(name, email, password);

    // console.log(newUser, 'SERVICE');
    return newUser; 
};

module.exports = {
    create,
};