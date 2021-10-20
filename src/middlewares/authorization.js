const jwt = require('jsonwebtoken');
const Users = require('../models/usersModels');

const authorization = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await Users.findByEmail(decoded.email);
    delete user.password;
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = authorization;
