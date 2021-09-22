const UserService = require('../services/userService');

const create = async (req, res) => {
  const userInputs = req.body;

  const newUser = await UserService.create(userInputs);

  if (newUser.code) return res.status(newUser.code).json({ message: newUser.message });

  res.status(201).json(newUser);
};

module.exports = {
  create,
};
