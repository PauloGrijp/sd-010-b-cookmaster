const jwt = require('jsonwebtoken');
const { findByEmail } = require('../models/usersModel');

const secret = 'minhaSenha';

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
 return res.status(401).json({ message: 'missing auth token' });
}
try {
  const validate = jwt.verify(authorization, secret);
  const email = await findByEmail(validate.email);
  if (!email) return res.status(401).json({ message: 'jwt malformed' });
  // return validate;
  req.user = validate;
  next();
} catch (error) {
  return res.status(401).json({ message: 'jwt malformed' });
}
};

module.exports = { verifyToken };