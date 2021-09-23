const jwt = require('jsonwebtoken');

const SECRET = 'secret';

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  console.log(authorization);
  
  try {
    const decode = jwt.verify(authorization, SECRET);
    req.user = decode;
    console.log(decode);
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  verifyToken,
};
