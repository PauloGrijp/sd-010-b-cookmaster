const code = require('http-status-codes');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/LoginModel');

const secret = 'seusecretdetoken';

const validationJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
     return res.status(code.UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.findUser({ 
      email: decoded.data.email, password: decoded.data.password, 
    });
    
    if (!user) {
      return res.status(code.NOT_FOUND).json({ message: 'user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(code.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = validationJWT;