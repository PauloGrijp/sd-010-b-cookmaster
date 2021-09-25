const jwt = require('jsonwebtoken');

const secret = 'akojtA3FFkK3KA5z';

const Users = require('../models/Users');

const UNAUTHORIZED = 'unauthorized';
const jwtMalformed = { codeError: UNAUTHORIZED, isErrorMessage: 'jwt malformed' };
const missingToken = { codeError: UNAUTHORIZED, isErrorMessage: 'missing auth token' };

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(missingToken);

  try {
    const { _id } = jwt.verify(token, secret);

    const user = await Users.getUserById(_id);
    if (!user) return next(jwtMalformed);
    if (user.isErrorMessage) {
      return next({
        codeError: user.codeError,
        isErrorMessage: user.isErrorMessage,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(jwtMalformed);
  }
};

module.exports = validateToken;
