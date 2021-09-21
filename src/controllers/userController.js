const jwt = require('jsonwebtoken');
const { registerUser, findByEmail } = require('../models/userModel');

const secret = 'seusecretdetoken';
const jwtConfig = { expiresIn: '15m', algorithm: 'HS256' };

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { name: nameU, email: emailU, _id, role } = await registerUser({ name, email, password });

  res.status(201).json({ 
    message: 'Novo usuário criado com sucesso',
    user: { name: nameU, email: emailU, role, _id } });
};

const login = async (req, res) => {
  const { email: emailLogin } = req.body;

  const { _id, email, role } = await findByEmail({ email: emailLogin });

  const token = jwt.sign({ data: { id: _id, email, role } }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  createUser,
  login,
};