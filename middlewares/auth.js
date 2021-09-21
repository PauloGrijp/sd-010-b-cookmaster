const jwt = require('jsonwebtoken');

const secret = 'MyReallySuperSecretSecret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: { message: 'Token não encontrado' },
    });
  }
  try {
    const decoded = jwt.verify(token, secret);
    res.role = decoded.role;
    res.id = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
