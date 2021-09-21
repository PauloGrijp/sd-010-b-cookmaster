const jwt = require('jsonwebtoken');
const usersModel = require('../model/usersModel');
const usersService = require('../services/usersServices');

const secret = 'superSecret';

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const messageErr = { message: 'Email already registered' };

  if (await usersModel.findByEmail(email)) return res.status(409).json(messageErr);

  const user = await usersService.createUser(name, email, password);
  if (user.error) return res.status(400).json(user.err);
  return res.status(201).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const messageErr = { 
    messageField: 'All fields must be filled',
    messageInc: 'Incorrect username or password',
  };

  if (!email || !password) return res.status(401).json({ message: messageErr.messageField });

  const user = await usersModel.findByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: messageErr.messageInc });
  }
  
  const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return res.status(200).json({ token });
  };

module.exports = {
  createUser,
  login,
};