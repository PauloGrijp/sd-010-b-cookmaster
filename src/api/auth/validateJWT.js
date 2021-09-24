require('dotenv').config();
const jwt = require('jsonwebtoken');
const { StatusCodes: { UNAUTHORIZED, NOT_FOUND } } = require('http-status-codes');
const { findUser } = require('../models/Users');

const secret = process.env.SECRET || 'notSoSecret';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  // esse if não é necessário
  // if (!token) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await findUser(decoded.email);

    if (!user) return res.status(NOT_FOUND).json({ message: 'User not found' });
    
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = {
  validateJWT,
};
