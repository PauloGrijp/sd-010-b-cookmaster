const userService = require('../services/userService');

const verifyName = (req, res, next) => {
  const { name } = req.body;
  if (!name) { return res.status(400).json({ message: 'Invalid entries. Try again.' }); }
  next();
};

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const validEmail = userService.validateEmail(email);
  if (!validEmail) { 
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
}
  const emailAlreadyExists = await userService.emailExistance(email);
  if (emailAlreadyExists) { 
    return res.status(409).json({ message: 'Email already registered' }); 
}
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) { return res.status(400).json({ message: 'Invalid entries. Try again.' }); }
  next();
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userService.createUser({ name, email, password });
  return res.status(200).json({ user: result });
};

module.exports = { 
  createUser,
  verifyName,
  verifyEmail,
  verifyPassword,
  
};