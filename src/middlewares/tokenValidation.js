const jwt = require('jsonwebtoken');

const SECRET = 'secret';

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  
  try {
    jwt.verify(authorization, SECRET); 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  verifyToken,
};
