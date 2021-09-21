const { getEmail } = require('../service/usersService');

const httpStatus = {
  badRequest: 400,
  conflict: 409,
};

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

module.exports = {
  verifyEmailSignUp,
  verifyNameSignUp,
  verifyPasswordSignUp,
};
