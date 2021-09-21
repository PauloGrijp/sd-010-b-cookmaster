const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const UsersService = require('../services/usersServices');

const secret = 'minhaSenha';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
 };

const registerUsers = rescue(async (req, res) => {
  const { email, password, name } = req.body;
  const result = await UsersService.registerUsers(email, password, name);
if (result.message) return res.status(result.status).json({ message: result.message });
return res.status(201).json(result);
});

const loginUser = rescue(async (req, res) => {
  const { email, password } = req.body;
  const result = await UsersService.loginUser(email, password);
  if (result.message) return res.status(result.status).json({ message: result.message });
  const { _id, role } = result;
  const payload = { _id, role, email };
  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(200).json(token);
});

module.exports = {
  registerUsers,
  loginUser };