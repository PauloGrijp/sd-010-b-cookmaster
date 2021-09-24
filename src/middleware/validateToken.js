const jwt = require('jsonwebtoken');

const SECRET = '123456';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }

    jwt.verify(authorization, SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({ message: err.message });
}
      if (decode) {
        const { _id, role } = decode;
        req.user = { _id, role };
      }
    });

    return next();
  };
module.exports = { validateToken };