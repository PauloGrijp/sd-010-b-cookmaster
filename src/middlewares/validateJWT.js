const jwt = require('jsonwebtoken');

const secret = 'eg$xeRMV9TL#K!HaqepGiE8!';

const jwtError = {
  message: 'jwt malformed',
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json(jwtError);

  try {
    const decoded = jwt.verify(token, secret);
    
    req.user = decoded;
    
    next();
  } catch (err) {
    return res.status(401).json(jwtError);
  }
};

module.exports = {
  validateToken,
};