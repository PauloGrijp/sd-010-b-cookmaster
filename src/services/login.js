const modelsLogin = require('../models/login');

const makeLogin = async (email, password) => {
    if (!email || !password) {
        return { errorType: 'unauthorized - empty field',
         error: { message: 'All fields must be filled' } };
    }

    const result = await modelsLogin.makeLogin(email, password);

    if (!result) {
        return { errorType: 'unauthorized incorrect data',
         error: { message: 'Incorrect username or password' } };
    }

    return result;
};

module.exports = {
    makeLogin,
};
