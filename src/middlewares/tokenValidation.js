const jwt = require('jsonwebtoken');
const codes = require('../httpcodes');

const secret = 'myawesomesecret';

const msg = 'jwt malformed';
const missingToken = 'missing auth token';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(codes.unhautorized).json({ message: missingToken });
  console.log('token');
  try {
    const decoded = jwt.verify(token, secret);

    const { user } = decoded;

    req.body.user = user;

    return next();
  } catch (err) {
    return res.status(codes.unhautorized).json({ message: msg });
  }
};
