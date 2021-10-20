const rescue = require('express-rescue'); 

const { userService } = require('../services');

const createUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await userService.createUser(name, email, password);

  if (newUser.error) return next(newUser);

  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // do novo Produto
  return res.status(201).json(newUser);
});

module.exports = {
  createUser,
};
