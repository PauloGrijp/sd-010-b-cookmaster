const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');

const secret = 'mySuperPassword';

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const jwtValidation = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decodification = jwt.verify(token, secret);
    const user = await loginModel.findUserByLogin({ 
      email: decodification.data.email, password: decodification.data.password, 
    });

    if (!user) {
      return res.status(NOT_FOUND).json({ message: 'user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  jwtValidation,
};
