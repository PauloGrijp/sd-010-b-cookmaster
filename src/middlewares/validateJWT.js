const jwt = require('jsonwebtoken');
const { usersModels } = require('../models');

const SECRET = 'a-colher-nao-existe';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await usersModels.findByEmail(decoded.email);
    delete user.password;
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
