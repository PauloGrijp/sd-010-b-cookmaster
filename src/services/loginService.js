const usersModel = require('../models/userModel');

const existField = (email, password) => {
    if (!email || !password) {
      return false;
    }
    return true;
};
const isValidEmail = (email) => {
    const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (!regexEmail.test(email)) {
        return false;
    }
    return true;
};

const existPassword = (loginUser, passUser) => {
    if (!loginUser) {
        return false;
    }
    const { password } = loginUser;
    if (password !== passUser) {
        return false;
    }
    return true;
};

const login = async ({ email, password }) => {
    console.log(password);
    const fieldsExists = existField(email, password);
    const validEmail = isValidEmail(email);
    if (!fieldsExists) {
        return { message: 'All fields must be filled' }; 
    }
    if (!validEmail) {
        return { message: 'Incorret username or password' }; 
    }

    const loginUser = await usersModel.findUser({ email, password });
    console.log(loginUser);
   /*  if (!loginUser.password) {
        return { message: 'Incorret username or password' }; 
    } */
    /* console.log(loginUser.password); */
    const passwordExist = existPassword(loginUser, password);
    if (!passwordExist) {
        return { message: 'Incorrect username or password' };
    }

    return loginUser;
};

module.exports = { login };