const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/users');

const SECRET = 'senha1337';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, SECRET);

    if (!payload) return res.status(401).json({ message: 'jwt malformed' });

    const user = await findUserByEmail(payload.email);

    if (!user) return res.status(401).json({ message: 'invalid user' });

    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { validateToken };
