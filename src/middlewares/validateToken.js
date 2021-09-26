const jwt = require('jsonwebtoken');

const SECRET = 'vqvtrybe';

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error('missing auth token');
    error.code = 401;
    throw error;
  }
  try {
    jwt.verify(token, SECRET);
  } catch (err) {
    console.log(err);
    err.message = 'jwt malformed';
    err.code = 401;
    throw err;
  }
  const payload = jwt.verify(token, SECRET);
  req.user = payload;
  next();
};

module.exports = { validateToken };