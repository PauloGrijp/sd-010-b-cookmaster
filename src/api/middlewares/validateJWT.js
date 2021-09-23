const jwt = require('jsonwebtoken');

const secret = 'akojtA3FFkK3KA5z';

const Users = require('../models/Users');

const UNAUTHORIZED = 'unauthorized';

const validateToken = async (req, res, next) => {
  const jwtError = { codeError: UNAUTHORIZED, isErrorMessage: 'jwt malformed' };

  const token = req.headers.authorization;
  if (!token) return next(jwtError);

  try {
    const { _id } = jwt.verify(token, secret);

    const user = await Users.getUserById(_id);
    if (!user) return next(jwtError);

    req.user = user;

    next();
  } catch (error) {
    next(jwtError);
  }
};

module.exports = {
  validateToken,
};
