const { create } = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await create({ name, email, password });
  return res.status(201).json(user);
};

module.exports = { createUser };
