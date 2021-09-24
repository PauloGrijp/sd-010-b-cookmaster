const jwt = require('jsonwebtoken');
const loginModel = require('../models/Login');

const validateEntries = (email, password) => {
  if (!email || !password) {
    return { fieldError: true, message: 'All fields must be filled' };
  }
};

const SECRET_KEY = 'supersecretkey';
const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async ({ email, password }) => {
  if (email === 'root@email.com' && password === 'admin') {
    const result = await loginModel.loginValidate({ email, password });
    const { password: _, ...userPayload } = result;
    console.log(userPayload);

    const accessToken = jwt.sign(userPayload, SECRET_KEY, JWT_CONFIG); 
    return accessToken;
  }

  const checkEntries = validateEntries(email, password);

  if (checkEntries) return checkEntries;

  const result = await loginModel.loginValidate({ email, password });

  if (!result) return { loginError: true, message: 'Incorrect username or password' };
  // console.log('console login service', result);

  const { password: _, ...userPayload } = result;
  console.log(userPayload);

  const accessToken = jwt.sign(userPayload, SECRET_KEY, JWT_CONFIG);  

  return accessToken;  
};

module.exports = { login };
