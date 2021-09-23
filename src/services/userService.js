const { formsValidator } = require('../middleware/users');
const {
  modelUserReg, modelEmailVerifier,
} = require('../models/users');

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

     module.exports = {
  servUserReg,
};