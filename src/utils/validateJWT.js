const jwt = require('jsonwebtoken');

JWT_SECRET = 'Jean-Luc Picard is the best Starfleet Captain';

const tokenEncrypt = (data) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: '1d',
  });
};

const tokenDecrypt = (token) => {
  if (!token) return false;
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  tokenEncrypt,
  tokenDecrypt,
};
