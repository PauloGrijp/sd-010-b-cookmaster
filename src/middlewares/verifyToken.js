const jwt = require('jsonwebtoken');
const { findByEmail } = require('../models/usersModel');

const secret = 'minhaSenha';

const verifyToken = async (token) => {
  if (!token) {
 return {
   status: 401,
    message: 'missing auth token',
  }; 
}
try {
  const validate = jwt.verify(token, secret);
  const email = await findByEmail(validate.email);
  if (!email) return { status: 401, message: 'jwt malformed' };
  return validate;
} catch (error) {
  return { status: 401, message: 'jwt malformed',
  };
}
};

module.exports = { verifyToken };