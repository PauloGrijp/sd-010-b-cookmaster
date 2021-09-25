const jwt = require('jsonwebtoken');

const validatejwt = async (req, res, next) => {
  const segredo = 'seusecretdetoken';
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    jwt.verify(token, segredo);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validatejwt;