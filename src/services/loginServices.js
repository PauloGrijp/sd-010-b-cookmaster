const loginModel = require('../models/loginModel');

const validateEmail = (email) => {
  const regexEmail = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
  return regexEmail.test(email);
};

const userLogin = async (email, password) => {
  if (!validateEmail(email)) {
    return {
      message: 'Incorret username or password',
    }; 
  }
  
  const user = await loginModel.findUser(email);
  
  if (user.email === email && user.password === password) return user;
  
  return { message: 'Incorret username or password' };
};

module.exports = { userLogin };
