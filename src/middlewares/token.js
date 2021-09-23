const JWT = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/statusCodes');

const KEYWORD = 'SECRET';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  JWT.verify(token, KEYWORD, (err) => {
    if (err) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

    return next();
  });
};

module.exports = validateToken; 