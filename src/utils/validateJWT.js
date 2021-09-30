const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecret';

const tokenEncrypt = (data) =>
  jwt.sign(data, JWT_SECRET, {
    expiresIn: '1d',
  });

const tokenDecrypt = (token) => {
  if (!token) return false;
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  tokenEncrypt,
  tokenDecrypt,
};
