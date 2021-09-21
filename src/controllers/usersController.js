const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await usersService.createUser(name, email, password);
    return newUser.err 
    ? res.status(newUser.err.code).json({ message: newUser.err.message })
    : res.status(201).json({ user: newUser });
};

module.exports = {
  createUser,
};