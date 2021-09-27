const rescue = require('express-rescue');
const User = require('../services/userService');

const createUser = rescue(async (req, res) => {
  const { email, name, password } = req.body;
  // console.log(name, email, password);
  const user = await User.createUser(email, name, password);
  return res.status(201).json(user);
});

module.exports = {
    createUser,
};
