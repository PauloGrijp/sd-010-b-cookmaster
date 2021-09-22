const jwt = require('jsonwebtoken');
const ErrorRequest = require('../helpers/errorRequest');

const secret = 'cookmaster';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new ErrorRequest('unauthorized', 'missing auth token');
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (decoded) {
      const { _id, role } = decoded;
      req.userId = _id;
      req.role = role;
    }

    if (err) throw new ErrorRequest('unauthorized', err.message);
  });
  next();
};
