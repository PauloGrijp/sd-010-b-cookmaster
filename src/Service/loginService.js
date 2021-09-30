const loginModel = require('../model/loginModel');
const validations = require('../validations/validations');

const login = async (user) => {
    // console.log(user);
    if (!validations.loginValidations(user)) return false;
    const email = validations.validEmail(user.email);
    
    console.log('email', email);
    if (email === false) {
        console.log('entrei');
        return 'invalid_email_passwd';
    }
    const passwd = await validations.validPassword(user);
    console.log('passwd', passwd);
    if (!passwd) {
        return 'invalid_email_passwd';
    }
    const users = await loginModel.getByEmail(user);
    console.log(users);
    return users;
};

module.exports = { login };