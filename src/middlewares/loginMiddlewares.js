const Error = require('../helpers/errorUsers');

const validateEmailPassword = (req, res, next) => {
  const { code, message } = Error.unauthorized('All fields must be filled');
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(code).json({
      message,
    });
  }
  next();
};

module.exports = {
  validateEmailPassword,
};