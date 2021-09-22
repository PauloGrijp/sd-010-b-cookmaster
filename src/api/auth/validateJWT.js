const jwt = require('jsonwebtoken');
const userModel = require('../../../model/usersModel');

const validateToken = async (req, res, next) => {
  const secret = 'superSecret';
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'token n informado' });
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findByName(decoded.data.name);
    req.user = user;
  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken;