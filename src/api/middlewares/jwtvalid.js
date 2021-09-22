const jwt = require('jsonwebtoken');

const secret = 'minhaSenha';

const validateJwt = (token) => {
  if (!token) return 'missing auth token';

  try {
    const validToken = jwt.verify(token, secret);
    return validToken;
  } catch (error) {
    return 'jwt malformed';
  }
};

module.exports = validateJwt;