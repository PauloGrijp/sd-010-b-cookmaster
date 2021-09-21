const UsersServices = require('../services/UsersService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userCreated = await UsersServices.create(name, email, password);

  if (userCreated.message) {
    return res.status(userCreated.status).json({ message: userCreated.message });
  }
    
  res.status(201).json({ user: userCreated });
};

module.exports = {
  createUser,
};