const usersServices = require('../services/usersServices');

const HTTP_200 = 200;
const HTTP_201 = 201;

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const { err, user } = await usersServices.create(name, email, password);
  if (err) return res.status(err.status).json({ message: err.message });
  return res.status(HTTP_201).json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { err, token } = await usersServices.login(email, password);
  if (err) return res.status(err.status).json({ message: err.message });
  return res.status(HTTP_200).json({ token });
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.payload;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
  const user = await usersServices.createAdmin(name, email, password);
  return res.status(201).json(user);
};

module.exports = {
  create,
  login,
  createAdmin,
}; 
