const { verifyJWT } = require('./jwtFunctions');

const authValidation = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const payload = verifyJWT(authorization);
    req.payload = payload;
    return next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { authValidation };