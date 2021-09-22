const { code, error } = require('../schema');

const checkEmail = /^[a-z0-9.]+@[a-z]+\.([a-z]+)?$/i;

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(code.HTTP_UNAUTHORIZED).json({ message: error.unfilledFields });
  }

  if (!checkEmail.test(email) || password.toString().length < 8) {
    return res.status(code.HTTP_UNAUTHORIZED).json({ message: error.incorrectField });
  }

  next();
};

module.exports = { validateLogin };