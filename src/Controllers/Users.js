const service = require('../Services/Users');

const newUser = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await service.newUser(name, email, password, 'user');
  return res.status(201).json({ user: result });
};

const newAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.user;
  const result = await service.newAdmin(name, email, password, role);
  return res.status(201).json({ user: result });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await service.login(email, password);
  return res.status(200).json({ token });
};

module.exports = {
  newUser,
  login,
  newAdmin,
};
