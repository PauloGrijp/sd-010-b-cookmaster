const jwt = require('jsonwebtoken');

const secret = 'super-senha';

async function validateJWT(req, res, next) {
  const token = req.headers.authorization;

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload.data;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
}

module.exports = validateJWT;
