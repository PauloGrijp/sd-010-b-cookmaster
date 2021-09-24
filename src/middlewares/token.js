const JWT = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/statusCodes');

const KEYWORD = 'SECRET';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });

  try {
    const untoken = JWT.verify(token, KEYWORD);
  
    req.user = untoken;
  
    next();
  } catch (err) {
    if (err) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken; 