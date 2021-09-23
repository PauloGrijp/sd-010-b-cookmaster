const { postUserModel } = require('../model/usersModel');

// ---------------------------------------------------------------
// Requisito 1: SERVICE responsável por chamar MODEL de cadastro de usuários e retornar o usuário cadastrado para o CONTROLLER.

const postUserService = async ({ name, email, password }) => {
  const newUser = await postUserModel({ name, email, password });
  // console.log(`Service: name: ${name}, email: ${email}, password: ${password}`);

  return newUser;
};

module.exports = {
  postUserService,
};

// ---------------------------------------------------------------