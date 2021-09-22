const jwt = require('jsonwebtoken');
const userModel = require('../models/Users');

const SECRET_KEY = 'supersecretkey';

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('verify', token);

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await userModel.findByEmail(decoded.email);

    const { password, ...userData } = user;
    req.user = userData;

    console.log('validatejwt userdata', userData);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }  
};

module.exports = { verifyToken };
