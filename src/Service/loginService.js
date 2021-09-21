const loginModel = require('../Model/loginModel');
const validations = require('../validations/validations');

const login = async (user) => {
    console.log(user);
    if (!validations.loginValidations(user)) return false;
    const email = validations.validEmail(user.email);
    if (email === false) {
        return 'invalid_email_passwd';
    }
    const passwd = validations.validPassword(user.password);
    console.log('passwd', passwd);
    if (passwd === false) {
        return 'invalid_email_passwd';
    }
    const users = await loginModel.getByEmail(user);
    console.log(users);
    return users;
};

module.exports = { login };