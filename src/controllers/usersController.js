const { createUserS, login } = require('../services/usersService');

const createUserC = async (req, res) => {
  const { email, password, name } = req.body;
  const result = await createUserS(email, password, name, 'user');
  return res.status(201).json({ user: result });
};

const checkLoginC = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  return res.status(200).json({ token });
};

module.exports = {
  createUserC,
  checkLoginC,
};