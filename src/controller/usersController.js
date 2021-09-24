const express = require('express');
const { 
  validateNameExists,
  validateEmailExists, 
  validateEmailFormat, 
  validatePasswordExists, 
  validateEmailIsRegistered } = require('../middlewares/usersMiddlewares');
const { postUserService } = require('../service/usersService');

const usersRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 1: CONTROLLER responsável por receber a requisição de cadastro de usuário, chamar SERVICE e retornar o usuário cadastrado.

usersRouter.post('/',
  validateNameExists,
  validateEmailExists,
  validateEmailFormat,
  validatePasswordExists,
  validateEmailIsRegistered, async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await postUserService({ name, email, password, role: 'user' });
  // console.log(newUser);

  return res.status(201).json({ user: newUser });
});

// ---------------------------------------------------------------

module.exports = { usersRouter };
