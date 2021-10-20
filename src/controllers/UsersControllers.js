const Service = require('../services/UsersServices');

async function createItem(req, res) {
  const { name, email, password } = req.body;
  const user = await Service.createItem(name, email, password);

  if (user.err) return res.status(user.err.status).json(user.err.message);
  
  return res.status(201).json(user);
}

const createAdm = async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.payload;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  const user = await Service.createAdm(name, email, password);
  return user;
};

module.exports = {
  createItem,
  createAdm,
};