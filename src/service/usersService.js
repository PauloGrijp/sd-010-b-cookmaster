const { postUserModel } = require('../model/usersModel');

// ---------------------------------------------------------------
// Requisito 1: SERVICE responsável por chamar MODEL de cadastro de usuários e retornar o usuário cadastrado para o CONTROLLER.

const postUserService = async ({ name, email, password, role }) => {
  const newUser = await postUserModel({ name, email, password, role });

  return newUser;
};

// ---------------------------------------------------------------

module.exports = {
  postUserService,
};
