const { code, error } = require('../schema');

const checkEmail = /^[a-z0-9.]+@[a-z]+\.([a-z]+)?$/i;

const requiredField = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: error.invalidEntries });
  }

  if (!email || !checkEmail.test(email)) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: error.invalidEntries });
  }

  if (!password) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: error.invalidEntries });
  }

  next();
};

module.exports = {
 requiredField,
};
