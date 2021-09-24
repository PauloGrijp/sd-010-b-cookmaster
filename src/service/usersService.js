const { generateToken } = require('../helpers/generateToken');
const { 
  postUserModel,
  getUserByEmail } = require('../model/usersModel');

// ---------------------------------------------------------------
// Requisito 1: SERVICE responsável por chamar MODEL de cadastro de usuários e retornar o usuário cadastrado para o CONTROLLER.

const postUserService = async ({ name, email, password, role }) => {
  const newUser = await postUserModel({ name, email, password, role });

  return newUser;
};

// ---------------------------------------------------------------
// Requisito 2: SERVICE responsável por autenticar "email" e "password", gerar e retornar o TOKEN.

const postLoginService = async ({ email, password }) => {
  const user = await getUserByEmail(email);

  if (!user || user.password !== password) return null;

  const { id, role } = user;

  const token = generateToken({ id, email, role });
  
  return token;
};

// ---------------------------------------------------------------

module.exports = {
  postUserService,
  postLoginService,
};
