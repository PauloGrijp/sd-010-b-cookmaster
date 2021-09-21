const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService');

const secret = 'segredosupersecreto';

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await usersService.createUser(name, email, password);
    return res.status(201).json({ user: newUser });
  } catch (error) {
    const { err: { code, message } } = error;
    return res.status(code).json({ message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersService.login(email, password);

    const { _id, role } = user;
    
    const jwtConfig = {
      expiresIn: '10m',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ id: _id, email, role }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    const { err: { code, message } } = error;
    return res.status(code).json({ message });
  }
};

module.exports = {
  createUser,
  login,
};