const { createUser } = require('../models/createUser');

const createAction = async (req, res) => {
  const { name, email, password } = req.body;
  const { name: userName, email: mail, _id, role } = await createUser({ name, email, password });

  res.status(201).json({ 
    message: 'Novo usuário criado com sucesso',
    user: { name: userName, email: mail, _id, role } });
};

module.exports = {
  createAction,
};
