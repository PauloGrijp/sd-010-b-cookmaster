const validacoes = require('../validations');
const model = require('../models/login');

const loginUsuario = async (user) => {
  const result = await model.loginUsuario(user);
  const verificacao = validacoes.validacaoLoginUsuario(user, result);

  if (verificacao) {
    return verificacao;
  }

  return result;
};

module.exports = { 
  loginUsuario,
};