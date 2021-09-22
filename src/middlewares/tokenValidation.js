const jwt = require('jsonwebtoken');

const SECRET = 'secret';

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
  });

  next();
};

module.exports = {
  verifyToken,
};
