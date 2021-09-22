/* const usersModel = require('../model/usersModel'); */
const usersService = require('../services/usersService');

const add = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = await usersService.add(name, email, password);
    if (users.message) return res.status(409).json(users);
    return res.status(201).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { add };