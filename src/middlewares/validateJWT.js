const jwt = require('jsonwebtoken');
const Error = require('../helpers/errorUsers');

const secret = 'minha-senha';

const validateJWT = async (req, res, next) => {
  const { code, message } = Error.unauthorized('missing auth token');
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(code).json({
      message,
    });
  }
  try {
    req.user = jwt.verify(authorization, secret);
    return next();
  } catch (err) {
    return res.status(code).json({
      message: 'jwt malformed', 
    });
  }
};

module.exports = validateJWT;