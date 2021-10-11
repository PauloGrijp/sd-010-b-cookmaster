const usersServices = require('../services/usersServices');

const HTTP_201 = 201;

const create = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const { err, user } = await usersServices.create(name, email, password);
  if (err) return res.status(err.status).json({ message: err.message });
  return res.status(HTTP_201).json(user);
};

module.exports = {
  create,
}; 
