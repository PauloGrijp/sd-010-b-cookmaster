const { verify } = require('./jwtFunctions');

const authBasic = (req, res, next) => {
    const { authorization } = req.headers;
    try {
      const payload = verify(authorization);
      req.payload = payload;
      return next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
};

module.exports = { authBasic };