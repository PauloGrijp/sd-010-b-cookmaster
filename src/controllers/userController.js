const userService = require('../services/userService');

const CREATED = 201;

const createdUser = async (req, res) => {
  const userData = req.body;
  const newUser = await userService.created(userData);

  if (Object.keys(newUser).includes('err')) {
    console.log(newUser, 'aqui dnv');
    return res.status(newUser.err.code).json({ message: newUser.err.message });
  }
  return res.status(CREATED).json({ user: newUser });
};

module.exports = {
  createdUser,
};