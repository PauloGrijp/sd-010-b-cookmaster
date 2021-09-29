const jwt = require('jsonwebtoken');

const secret = 'mysecrettoken';

const tokenValidator = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) return res.status(401).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(authorization, secret);

    req.user = decoded.data;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { tokenValidator };
