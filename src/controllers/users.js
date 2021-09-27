const service = require('../services/users');

async function newUser(req, res) {
  const { name, email, password } = req.body;
  const result = await service.newUser(name, email, password, 'user');
  return res.status(201).json({ user: result });
}

async function login(req, res) {
  const { email, password } = req.body;
  const result = await service.login(email, password);
  return res.status(200).json({ token: result });
}

module.exports = {
  newUser,
  login,
};