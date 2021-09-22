const jwt = require('jsonwebtoken');
const { code, error } = require('../schema');

const secret = 'cookmasterprojecttoken';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const payload = jwt.verify(token, secret);

    req.user = payload.data;
    
    next();
  } catch (e) {
    return res.status(code.HTTP_UNAUTHORIZED).json({ message: error.invalidToken });
  }
};

module.exports = validateJWT;
