const jwt = require('jsonwebtoken');
const { modelEmailVerifier } = require('../models/users');
const { secret } = require('../services/userService');

const tokenValidator = async (token) => {
  if (!token) {
    return { err: { message: 'jwt malformed' }, code: 401 };
  }
  try {
    const { data: { email } } = jwt.verify(token, secret);
    const user = await modelEmailVerifier(email);
    if (!user) {
      return { err: { message: 'invalid user' }, code: 401 };
    }
  } catch (error) {
    return { err: { message: 'jwt malformed' }, code: 401 };
  }
};

const fieldValidator = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { 
      err: {
      message: 'Invalid entries. Try again.',
     },
     code: 400 };
  }
    return false;
  };

 module.exports = {
  fieldValidator,
  tokenValidator,
 };