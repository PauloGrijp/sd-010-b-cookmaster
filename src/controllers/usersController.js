const userService = require('../services/usersService');

function validateFields(req, res, next) {
  const { name, password, email } = req.body;

  if (!userService.validateFields(name, password, email)) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
}

async function validateEmail(req, res, next) {
  const { email } = req.body;

  const user = await userService.validateEmail(email);

  if (!user) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  next();
}

async function createUser(req, res) {
  const { name, email, password } = req.body;

  const newUser = await userService.createUser({ name, email, password });
  
  return res.status(201).json({
    user:
     newUser,
  });
}

module.exports = {
  validateFields,
  validateEmail,
  createUser,
};