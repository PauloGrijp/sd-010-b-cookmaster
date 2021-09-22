const jwt = require('jsonwebtoken');
const UserModels = require('../models/users');
// const UserServices = require('../services/users');

const secret = 'superSenha';

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
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const payload = delete user.name;

  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};
