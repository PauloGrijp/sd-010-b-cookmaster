const jwt = require('jsonwebtoken');

const secret = 'mysecrettoken';

const tokenValidator = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const decoded = jwt.verify(authorization, secret);

    req.user = decoded.data;

    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { tokenValidator };
