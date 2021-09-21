const service = require('../services/users');

async function newUser(req, res) {
  const { name, email, password } = req.body;
  const result = await service.newUser(name, email, password, 'user');
  return res.status(201).json({ user: result });
}

module.exports = {
  newUser,
};
