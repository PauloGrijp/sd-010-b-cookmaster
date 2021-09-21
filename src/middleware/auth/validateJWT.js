const jwt = require('jsonwebtoken');

const secret = 'senha-secreta';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.data;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
