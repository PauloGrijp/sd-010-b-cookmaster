const { createUserS, checkEmailS, createUserAdminS } = require('../services/usersService');

const createUserC = async (req, res) => {
  const { email, password, name } = req.body;
  const result = await createUserS(email, password, name, 'user');
  return res.status(201).json({ user: result });
};
const checkEmailC = async (req, res) => {
  const { email, password } = req.body;
  const token = await checkEmailS(email, password);
  return res.status(200).json({ token });
};
const createUserAdminC = async (req, res) => {
  const { email, password, name } = req.body;
  const { role } = req.user;
  const result = await createUserAdminS(email, password, name, role);
  return res.status(201).json({ user: result });
};

module.exports = {
  createUserC,
  checkEmailC,
  createUserAdminC,
};
