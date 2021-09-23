const userServive = require('../services/userService');

const nameCheck = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
 return res.status(400).json(
    { message: 'Invalid entries. Try again.' },
  );
  }
  next();
};

const emailCheck = async (req, res, next) => {
  const { email } = req.body;
  const validEmail = await userServive.emailValidate(email);
  if (!validEmail) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const emailExists = await userServive.existentEmail(email);
  if (emailExists) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

const passwordCheck = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userServive.createUser({ name, email, password });
  return res.status(201).json({
    user: result,
  });
};

module.exports = {
  createUser,
  nameCheck,
  emailCheck,
  passwordCheck,
};
