const jwt = require('jsonwebtoken');

const secret = 'super-senha';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) res.status(401).json({ message: 'jwt malformed' });

  try {
    const payload = await jwt.verify(token, secret);

    req.user = payload.data;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
