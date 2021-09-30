const jwt = require('jsonwebtoken');
const { getUserData } = require('../models/user.model');

const secret = 'mytokensecret';

const jwtValidation = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const payload = jwt.verify(token, secret);
    const user = await getUserData(payload.data.email);

    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = jwtValidation;