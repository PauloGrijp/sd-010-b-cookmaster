const validacoes = require('../validations');
const model = require('../models/recipes');

const receitas = async (param) => {
  console.log(param);
  const verificacao = validacoes.validacaoCampoReceita(param);
  
  if (verificacao) {
    return verificacao;
  }
  
  const result = await model.receitas(param);

  return result;
};

module.exports = { 
  receitas,
};