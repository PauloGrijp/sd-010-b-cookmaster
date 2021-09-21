const rescue = require('express-rescue');
const UsersService = require('../services/usersServices');

const registerUsers = rescue(async (req, res) => {
  const { email, password, name } = req.body;
  const result = await UsersService.registerUsers(email, password, name);
if (result.message) return res.status(result.status).json({ message: result.message });
return res.status(201).json(result);
});

module.exports = { registerUsers };