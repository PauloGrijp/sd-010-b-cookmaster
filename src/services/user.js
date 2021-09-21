const validacoes = require('../validations');
const model = require('../models/user');

const cadastrarUsuario = async (user) => {
  const emailExiste = await model.emailExiste(user);
  const verificacao = validacoes.validacaoCadastramentoUsuario(user, emailExiste);

  if (verificacao) {
    return verificacao;
  }

  const result = await model.cadastrarUsuario(user);
  return result;
};

module.exports = { 
  cadastrarUsuario,
};