const jwt = require('jsonwebtoken');

const verifyToken = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ message: 'missing auth token' });
  try {
    const payload = jwt.verify(token, 'secret');
    req.user = payload;
    next();
  } catch (err) {
    next({ message: 'jwt malformed' });
  }
};

module.exports = { verifyToken };