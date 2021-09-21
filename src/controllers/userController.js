const userService = require('../services/userService');

const signUp = async (req, res) => {
  const { name, password, email } = req.body;
  const uniqueEmail = await userService.uniqueEmail(email);
  if (!uniqueEmail) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const newUser = await userService.signUp({ name, password, email });
  return res.status(201).json(newUser);
};

module.exports = {
  signUp,
};