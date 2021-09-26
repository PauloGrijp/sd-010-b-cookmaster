const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { findUserByEmail } = require('../models/users');

const SECRET = '9a44d69c7ad2a9395bdd7d4fbf6fdd2d';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'jwt malformed' });
  }

  try {
    const payload = jwt.verify(token, SECRET);

    const user = await findUserByEmail(payload.email);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'invalid user' });
    }

    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
  }
};

module.exports = { validateToken };
