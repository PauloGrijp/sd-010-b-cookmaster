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

const authValidation7 = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const payload = verifyJWT(authorization);
    req.payload = payload;

    if (!authorization) return console.log(authorization);
    if (!authorization) return res.status(401).json({ message: 'missing auth token' });
    return next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

const authValidation8 = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const payload = verifyJWT(authorization);
    req.payload = payload;
    return next();
  } catch (error) {
    res.status(401).json({ message: 'missing auth token' });
  }
};

module.exports = { authValidation, authValidation7, authValidation8 };