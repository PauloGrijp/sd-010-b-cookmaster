const validacoes = require('../validations');
const model = require('../models/recipes');

const cadastrarReceitas = async (receita) => {
  const verificacao = validacoes.validacaoCampoReceita(receita);
  
  if (verificacao) {
    return verificacao;
  }
  
  const result = await model.cadastrarReceitas(receita);

  return result;
};

module.exports = { 
  cadastrarReceitas,
};