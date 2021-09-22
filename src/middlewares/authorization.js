const jwt = require('jsonwebtoken');

const verifyToken = (req, _res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, 'secret');
    next();
  } catch (err) {
    next({ message: 'jwt malformed' });
  }
};

module.exports = { verifyToken };