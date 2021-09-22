const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/usersModel');

const secret = 'segredosupersecreto';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await getUserByEmail(decoded.email);
  
    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { validateJWT };