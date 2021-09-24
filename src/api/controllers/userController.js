const rescue = require('express-rescue');
const userServices = require('../services/userService');

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userServices.createUser(name, email, password);
  return res.status(200).json(user);
});

module.exports = {
    createUser,
};
