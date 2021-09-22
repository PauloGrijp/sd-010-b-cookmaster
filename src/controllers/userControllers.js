const jwt = require('jsonwebtoken');
const userValidations = require('../services/userValidations');

const secret = 'rafaelCamufla';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await userValidations.createUserValidations({
    name, email, password, role,
  });
  if (user.message === 'Invalid entries. Try again.') {
    return res.status(400).json({ message: user.message });
  }
  if (user.message === 'Email already registered') {
    return res.status(409).json({ message: user.message });
  }
  return res.status(201).json({ user: { name, email, role: 'user', _id: user.id } });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const login = await userValidations.findLogin({ email, password });
  console.log(login);
  const token = jwt.sign({ login }, secret, jwtConfig);
  res.status(200).json({ token });
};

module.exports = {
  createUser,
  loginUser,
};
