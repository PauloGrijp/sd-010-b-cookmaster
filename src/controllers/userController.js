const { registerUser } = require('../models/userModel');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { name: nameU, email: emailU, _id, role } = await registerUser({ name, email, password });

  res.status(201).json({ 
    message: 'Novo usuário criado com sucesso',
    user: { name: nameU, email: emailU, role, _id } });
};

module.exports = {
  createUser,
};