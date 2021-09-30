const express = require('express');
const { 
  validateEmailToken,
  validatePasswordToken,
  validateEmailFormatToken,
  validatePasswordIsValidToken, 
  validateJWT } = require('../middlewares/loginMiddlewares');
const { 
  validateNameExists,
  validateEmailExists, 
  validateEmailFormat, 
  validatePasswordExists, 
  validateEmailIsRegistered } = require('../middlewares/usersMiddlewares');
const { 
  postUserService,
  postLoginService, 
  postAdminService } = require('../service/usersService');

const usersRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 1: CONTROLLER responsável por receber a requisição de cadastro de usuário, chamar SERVICE e retornar o usuário cadastrado.

usersRouter.post('/users',
  validateNameExists,
  validateEmailExists,
  validateEmailFormat,
  validatePasswordExists,
  validateEmailIsRegistered, async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await postUserService({ name, email, password, role: 'user' });

  return res.status(201).json({ user: newUser });
});

// ---------------------------------------------------------------
// Requisito 2: CONTROLLER responsável por receber a requisição de login de usuário, chamar SERVICE e retornar o TOKEN.

usersRouter.post('/login',
  validateEmailToken,
  validatePasswordToken,
  validateEmailFormatToken,
  validatePasswordIsValidToken, async (req, res) => {
  const { email, password } = req.body;

  const token = await postLoginService({ email, password });

  return res.status(200).json({ token });
});

// ---------------------------------------------------------------
// Requisito 12: CONTROLLER responsável por receber a requisição de cadastro de usuário ADMIN, chamar SERVICE e retornar o usuário ADMIN cadastrado.

usersRouter.post('/users/admin', validateJWT, async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.user;

  const newAdmin = await postAdminService({
    name,
    email,
    password,
    role: 'admin',
    reqUserRole: role });
  
  if (!newAdmin) {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  } 

  return res.status(201).json({ user: newAdmin });
});

// ---------------------------------------------------------------

module.exports = { usersRouter };
