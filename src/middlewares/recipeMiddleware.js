const jwt = require('jsonwebtoken');
const httpStatus = require('../controller/httpStatus');

const secret = 'shhh';

const verifyRecipeBody = (req, res, next) => {
  if (req.body.name && req.body.ingredients && req.body.preparation) {
    next();
    return;
  }
  return res.status(httpStatus.badRequest).json({
    message: 'Invalid entries. Try again.',
  });
};

const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const data = jwt.verify(authorization, secret);
    req.loggedUser = data;
    next();
  } catch (e) {
    return res.status(httpStatus.unauthorized).json({
      message: 'jwt malformed',
    });
  }
};

module.exports = {
  verifyRecipeBody,
  verifyToken,
};
