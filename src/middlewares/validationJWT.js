const code = require('http-status-codes');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/LoginModel');

const secret = 'nenhumsegredo';

const validationJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
     return res.status(code.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const user = await UserModel.findUser(decoded.email, decoded.password);

    if (!user) {
      return res.status(code.NOT_FOUND).json({ message: 'user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(code.UNAUTHORIZED).json({ message: err.message });
  }
};

module.exports = validationJWT;