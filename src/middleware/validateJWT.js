const jwt = require('jsonwebtoken');
const { getByEmail } = require('../models/userModel');

const secret = 'semprealerta';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, secret);
    const user = await getByEmail(payload.email);

    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = validateJWT;