const jwt = require('jsonwebtoken');

const SECRET = 'secret';

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  
  try {
    const decode = jwt.verify(authorization, SECRET);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err.message, 'jwt-malformed');
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  verifyToken,
};
