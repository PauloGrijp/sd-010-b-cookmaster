const usersServices = require('../services/usersServices');

const createUser = async (req, res) => {
  const createdUser = await usersServices.createUser(req.body);

  if (createdUser.error) {
    const { error: { status, message } } = createdUser;
    return res.status(status).json({ message });
  }

  res.status(201).json({ ...createdUser });
};

module.exports = {
  createUser,
};