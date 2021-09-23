const jwt = require('jsonwebtoken');
const { formsValidator, loginValidator } = require('../middleware/users');
const {
  modelUserReg, modelEmailVerifier,
} = require('../models/users');

const secret = 'senhaToken';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const servUserReg = async (user) => { 
  const { name, email, password } = user;
  const invalidator = await formsValidator(name, email, password);
  if (invalidator) {
    return invalidator;
  }
  const validEmail = await modelEmailVerifier(email);
  
  if (validEmail !== null) {
    return { 
      err: {
      message: 'Email already registered',
     },
     code: 409 };
  }
   return modelUserReg(user);
};

const servlogin = async (login) => {
const { email, password } = login;
const invalidator = await loginValidator(email, password);
if (invalidator) {
  return invalidator;
}
const user = await modelEmailVerifier(email);
if (!user || user.password !== password) {
  return { 
    err: {
    message: 'Incorrect username or password',
   },
   code: 401 };
}
delete user.password;

const token = jwt.sign({ data: user }, secret, jwtConfig);
  return { code: 200, token };
};

     module.exports = {
  servUserReg,
  servlogin,
};