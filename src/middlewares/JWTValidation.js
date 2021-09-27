const jwt = require('jsonwebtoken');
const secret = require('../secret');

const usersModel = require('../models/usersModel');

const JWTValidation = async (req, res, next) => {
  const token = req.headers.authorization;

  // if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decode = jwt.verify(token, secret);

    const user = usersModel.getUser(decode.data.email);

    if (!user) return res.status(401).json({ message: 'Token\'s user not found' });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { JWTValidation };