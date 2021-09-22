const jwt = require('jsonwebtoken');
const { findUser } = require('../models/userModel');

const segredo = 'seusecretdetoken';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(401).json({ message: 'malformed' }); }
  try {
    const decoded = jwt.verify(token, segredo);
    console.log(decoded);
    const user = await findUser({ email: decoded.data.email, password: decoded.data.password });
    if (!user) {
        return res.status(401).json({ message: 'JWT' }); 
    }
    req.user = user;
    console.log(req.user);
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;