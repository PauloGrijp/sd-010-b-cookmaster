const jwt = require('jsonwebtoken');

const secret = 'senha';

async function validateJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const validate = jwt.verify(token, secret);
    req.user = validate;
    next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
}

module.exports = validateJWT;
