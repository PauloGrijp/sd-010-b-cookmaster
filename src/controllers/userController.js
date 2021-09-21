const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const secret = 'minhaSenha';

const signUp = async (req, res) => {
  const { name, password, email } = req.body;
  const uniqueEmail = await userService.uniqueEmail(email);
  if (!uniqueEmail) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const newUser = await userService.signUp({ name, password, email });
  return res.status(201).json(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findUser(email);
    
    if (!user || user.password !== password) { 
      return res.status(401).json({ message: 'Incorrect username or password' });
  }
  const { id, role } = user;
  const token = jwt.sign({ id, email, role }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  signUp,
  login,
};