const jwt = require('jsonwebtoken');

const secret = 'ran0405069miifjurdo43423zeuuADPlus';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const userSchema = require('../schemas/userSchema');
const userModel = require('../model/usersModel');

const authorizeLogin = async (req, res, next) => {
  const loginData = req.body;
  const error = await userSchema.validateLoginData(loginData);
  if (error) {
    return res.status(error.response).json({ message: error.message });
  }
  next();
};

const generateToken = (userData) => {
  const token = jwt.sign({ data: userData }, secret, jwtConfig);
  return { token };
};

const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new Error({ message: 'Token Not Found' });
    }
    const tokenDecoded = jwt.verify(token, secret);
    const { email } = tokenDecoded.data;
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new Error({ message: 'Invalid Token' });
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    if (req.url === '/admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  authorizeLogin,
  generateToken,
  validateToken,
  verifyToken,
};
