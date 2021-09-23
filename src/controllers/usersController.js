const usersService = require('../services/usersService');

const createUserC = async (req, res) => {
  const { email, password, name } = req.body;
  const result = await usersService.createUserS(email, password, name, 'user');
  return res.status(201).json({ user: result });
};

module.exports = {
  createUserC,
};
