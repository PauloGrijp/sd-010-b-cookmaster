const { getEmail, checkLoginUser } = require('../service/usersService');
const httpStatus = require('../controller/httpStatus');

const verifyUniqueEmail = async (email) => {
  const findedEmail = await getEmail(email);
  if (findedEmail) {
    return false;
  }
  return true;
};

const verifyEmailSignUp = async (req, res, next) => {
  const emailRegex = /[a-zA-Z0-9]+@[a-zA-Z]+\.com/gm;
  if (!req.body.email || !(emailRegex.test(req.body.email))) {
    return res.status(httpStatus.badRequest).json({ message: 'Invalid entries. Try again.' });
  }
  const { email } = req.body;
  const emailIsUnique = await verifyUniqueEmail(email);
  if (!emailIsUnique) {
    return res.status(httpStatus.conflict).json({ message: 'Email already registered' });
  }
  next();
};

const verifyNameSignUp = (req, res, next) => {
  if (!req.body.name || req.body.name === '') {
    return res.status(httpStatus.badRequest).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const verifyPasswordSignUp = async (req, res, next) => {
  if (!req.body.password || req.body.password === '') {
    return res.status(httpStatus.badRequest).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const checkBodyLogin = (req, res, next) => {
  if (req.body.email && req.body.password) {
    next();
    return;
  }
  return res.status(httpStatus.unauthorized).json({ message: 'All fields must be filled' });
};

const checkAssertionLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const succesfulLogin = await checkLoginUser(email, password);
  if (succesfulLogin) {
    next();
    return;
  }
  return res.status(httpStatus.unauthorized).json({ message: 'Incorrect username or password' });
};

module.exports = {
  verifyEmailSignUp,
  verifyNameSignUp,
  verifyPasswordSignUp,
  checkBodyLogin,
  checkAssertionLogin,
};
