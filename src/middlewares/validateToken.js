const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const SECRET = 'secretexample';

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: StatusCodes.UNAUTHORIZED, err: 'missing auth token',
    });
  }
  try {
    const payload = jwt.verify(token, SECRET);
    const user = await userModel.findUser(payload.email);
    if (!user) {
      return next({ status: StatusCodes.UNAUTHORIZED, err: 'invalid user' });
    }
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    return next({ status: StatusCodes.UNAUTHORIZED, err: error.message });
  }
};
