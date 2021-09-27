const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const jwtValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
    try {
      const payload = jwt.verify(token, secret);
      const { _id } = payload.data;
      req.user = { userId: _id };
      next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { jwtValidation };