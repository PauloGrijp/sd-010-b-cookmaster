const modelsUsers = require('../models/users');

const createUser = async (userData) => {
    const { name, email, password } = userData;
    if ([name, email, password].includes(undefined) || !email.match(/\w+@\w+.com/)) {
        return { errorType: 'bad_request', error: { message: 'Invalid entries. Try again.' } };
    }

    if (await modelsUsers.findEmail(email)) {
        return { errorType: 'conflict', error: { message: 'Email already registered' } }; 
}
    const result = await modelsUsers.createUser(userData);
    return result;
};

const createAdmin = async (adminData) => {
    const { name, email, password, role } = adminData;
    if (role !== 'admin') {
        return { errorType: 'forbidden',
        error: { message: 'Only admins can register new admins' } };
    }
    if ([name, email, password].includes(undefined) || !email.match(/\w+@\w+.com/)) {
        return { errorType: 'bad_request', error: { message: 'Invalid entries. Try again.' } };
    }

    if (await modelsUsers.findEmail(email)) {
        return { errorType: 'conflict', error: { message: 'Email already registered' } }; 
}
    const result = await modelsUsers.createAdmin(adminData);
    return result;
};

module.exports = {
    createUser,
    createAdmin,
};
