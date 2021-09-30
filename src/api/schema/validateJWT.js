const jwt = require('jsonwebtoken');
// const service = require('../services/serviceUsers');
// const model = require('../models/modelUsers');

const secret = 'tokensecreto';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);

  try {
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const decoded = jwt.verify(token, secret);

    const { data } = decoded;
    // console.log(data);

    req.user = data;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateToken,
};