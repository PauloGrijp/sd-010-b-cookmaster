const jwt = require('jsonwebtoken');

const secret = 'senha-super';

async function validateJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload.data;
    
    next();
  } catch (error) {
    // console.log(error.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
}

module.exports = validateJWT;
