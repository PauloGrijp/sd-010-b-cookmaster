const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.Authorization;
  const verified = jwt.verify(token);
  if (!verified) next({ message: 'jwt malformed' });
  next();
};

module.exports = { verifyToken };