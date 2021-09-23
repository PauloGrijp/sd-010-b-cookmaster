const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const create = await userService.createUser(name, email);
    return res.status(201).json(create);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
};