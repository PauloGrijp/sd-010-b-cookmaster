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

const editarReceita = async (id, receitaEditada, usuario) => {
  const { userId } = await model.buscarReceitasID(id);
  
  if (userId !== usuario.id && usuario.role !== 'admin') {
    return {
      message: 'missing auth token',
      code: 401,
    };
  }
  
  const result = await model.editarReceita(id, receitaEditada, usuario);

  return result;
};

const deleteReceita = async (id) => {
  const result = await model.deleteReceita(id);

  return result;
};

const adicionarImagem = async (id, usuario) => {
  const { userId } = await model.buscarReceitasID(id);
  
  if (userId !== usuario.id && usuario.role !== 'admin') {
    return {
      message: 'missing auth token',
      code: 401,
    };
  }

  const result = await model.adicionarImagem(id);

  return result;
};

module.exports = { 
  cadastrarReceitas,
  editarReceita,
  deleteReceita,
  adicionarImagem,
};