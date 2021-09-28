const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { userService } = require('../services');

const createUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await userService.createUser(name, email, password);

  if (newUser.error) return next(newUser);

  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // do novo Produto
  return res.status(201).json(newUser);
});

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  
  const secret = 'secret';
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const loggedUser = await userService.login(email, password);

  if (loggedUser.error) return next(loggedUser);

  const token = jwt.sign(loggedUser, secret, jwtConfig);
  
  res.status(200).json({ token });
});
module.exports = {
  createUser,
  login,
};
