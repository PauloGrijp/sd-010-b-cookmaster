const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const create = await userService.createUser(name, email, password);
    return res.status(201).json(create);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
};