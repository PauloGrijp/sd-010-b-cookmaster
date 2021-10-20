const jwt = require('jsonwebtoken');

const HTTP_UNAUTHORIZED_STATUS = 401;

const TOKEN_ERROR = 'missing auth token';

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
   return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: TOKEN_ERROR });
  }

  try {
    const decoded = jwt.verify(token, 'MySecret');

    req.user = decoded;

    return next();
  } catch (err) {
    err.statusCode = HTTP_UNAUTHORIZED_STATUS;

    return next(err);
  }
};

module.exports = auth;
