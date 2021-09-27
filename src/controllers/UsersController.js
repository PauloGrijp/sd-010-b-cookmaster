const UsersServices = require('../services/UserService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const created = await UsersServices.createUser(name, email, password);

  if (created.message) {
    return res.status(created.status).json({ message: created.message });
  }

  res.status(201).json({ user: created });
};

module.exports = {
  createUser,
};