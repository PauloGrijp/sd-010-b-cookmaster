const jwt = require('jsonwebtoken');
const JwtModel = require('../models/JwtModel');

const secret = 'superSecret123';
const UNAUTHORIZED = 401;
const MISSING_AUTH_TOKEN = { message: 'missing auth token' };

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED).json(MISSING_AUTH_TOKEN);
  }

  try {
    const decode = jwt.verify(token, secret);
    console.log(decode);
    const { email, password } = decode.data;

    const user = await JwtModel.findUser({ email, password });

    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'error' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
};
