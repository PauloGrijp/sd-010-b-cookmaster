const jwt = require('jsonwebtoken');
const UserModels = require('../models/users');
// const UserServices = require('../services/users');

const secret = 'superSenha';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const checkLogin = async (email, password) => {
  if (!email || !password) {
    return { message: 'All fields must be filled' };
  }

  const user = await UserModels.emailAlreadyExists(email);
  if (!user) { 
    return { message: 'Incorrect username or password' };
  }
  return user;
};

const login = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  const user = await checkLogin(email, password);
  if (user.message) return res.status(401).json(user);
  delete user.name;

  const newToken = jwt.sign({ data: user }, secret, jwtConfig);
  return res.status(200).json({ token: newToken });
};

module.exports = {
  login,
  secret,
};
