const jwt = require('jsonwebtoken');

const SECRET = '123456';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const verify = jwt.verify(authorization, SECRET);
    const { _id } = verify;
    if (verify) {
      req.user = { _id };
    }
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
}
};
module.exports = { validateToken };