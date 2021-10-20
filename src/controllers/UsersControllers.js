const Service = require('../services/UsersServices');

async function createItem(req, res) {
  const { name, email, password } = req.body;
  const user = await Service.createItem(name, email, password);

  if (user.err) return res.status(user.err.status).json(user.err.message);
  
  return res.status(201).json(user);
}

module.exports = {
  createItem,
};