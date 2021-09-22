const { StatusCodes: { CREATED, BAD_REQUEST, CONFLICT } } = require('http-status-codes');
const Users = require('../services/Users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await Users.createUser(name, email, password);

  if (newUser.conflict) return res.status(CONFLICT).json({ message: newUser.message });
  if (newUser.message) return res.status(BAD_REQUEST).json(newUser);

  return res.status(CREATED).json(newUser);
};

module.exports = {
  createUser,
};
