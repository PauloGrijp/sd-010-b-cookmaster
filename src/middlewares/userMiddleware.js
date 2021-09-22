const {
  HTTP_BAD_REQUEST,
} = require('../schema/codeHttp');
const err = require('../schema/errorMessage');

const checkEmail = /^[a-z0-9.]+@[a-z]+\.([a-z]+)?$/i;

const requiredField = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST).json({ message: err.invalidEntries });
  }

  if (!email || !checkEmail.test(email)) {
    return res.status(HTTP_BAD_REQUEST).json({ message: err.invalidEntries, type: '2' });
  }

  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json({ message: err.invalidEntries, type: '3' });
  }

  next();
};

module.exports = {
 requiredField,
};
