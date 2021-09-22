const jwt = require('jsonwebtoken');

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
  return validate;
} catch (error) {
  return {
   status: 401,
    message: 'jwt malformed',
  };
}
};

module.exports = { verifyToken };