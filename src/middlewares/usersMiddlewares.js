const { StatusCodes } = require('http-status-codes');

const validateEmail = (email) => {
  const regexEmail = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
  return regexEmail.test(email);
};

const checkValues = (req, res, next) => {
  const user = req.body;
  if (!user.name || !user.email || !user.password || !validateEmail(user.email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }
  
  next();
};

module.exports = { checkValues };
