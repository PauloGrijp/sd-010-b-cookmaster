const jwt = require('jsonwebtoken');

const { createUser, findByEmail } = require('../models/userModel');

const secretKey = 'tokensecretuser';

const jwtConfig = { expiresIn: '15m', algorithm: 'H2256' };

const userCreate = async (req, res) => {
  const { name, email, password } = req.body;
  const { name: nameU, email: emailU, _id, role } = await createUser({ name, email, password });

  res.status(201).json({ 
    message: 'Novo usuário criado com sucesso',
    user: { name: nameU, email: emailU, role, _id } });
};

const login = async (req, res) => {
  const { email: emailLogin } = req.body;

  const { _id, email, role } = await findByEmail({ email: emailLogin });

  const token = jwt.sign({ data: { id: _id, email, role } }, secretKey, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  userCreate,
  login,
};