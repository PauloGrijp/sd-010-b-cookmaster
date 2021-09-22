const jwt = require('jsonwebtoken');

const secret = 'minhaSenha';

const validateJwt = (token) => {
  if (!token) return 'token não existe';

  try {
    const validToken = jwt.verify(token, secret);
    return validToken;
  } catch (error) {
    return 'jwt malformed';
  }
};

module.exports = validateJwt;