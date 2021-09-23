const express = require('express');
const { postUserService } = require('../service/usersService');

const usersRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 1: CONTROLLER responsável por receber a requisição de cadastro de usuário, chamar SERVICE e retornar o usuário cadastrado.

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(`Controler: name: ${name}, email: ${email}, password: ${password}`);

  const newUser = await postUserService({ name, email, password });

  return res.status(201).json(newUser);
});

// ---------------------------------------------------------------

module.exports = { usersRouter };