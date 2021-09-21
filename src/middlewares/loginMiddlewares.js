const { StatusCodes } = require('http-status-codes');

const validateEmail = (email) => {
  const regexEmail = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
  return regexEmail.test(email);
};

const checkValues = (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'All fields must be filled',
    });
  }
  
  next();
};

const checkEmail = (req, res, next) => {
  const user = req.body;
  if (!validateEmail(user.email)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Incorrect username or password',
    });
  }
  
  next();
};
module.exports = { checkValues, checkEmail };
