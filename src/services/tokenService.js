const jwt = require('jsonwebtoken');

const secret = 'cookmaster';

const createToken = (payload) => {
  const jwtConfig = {
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = {
  createToken,
};
