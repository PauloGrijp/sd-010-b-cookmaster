const rescue = require('express-rescue');
const service = require('../services/recipes');
const model = require('../models/recipes');

const cadastrarReceitas = rescue(async (req, res, next) => {
  const { body } = req;
  const idUsuario = req.user.id;

  const receita = {
    userId: idUsuario,
    ...body,
  };

  const result = await service.cadastrarReceitas(receita);

  if ('code' in result) {
    return next(result);
  }

  return res.status(201).json(result);
});

const buscarReceitas = rescue(async (_req, res) => {
  const result = await model.buscarReceitas();

  return res.status(200).json(result);
});

const buscarReceitasID = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await model.buscarReceitasID(id);

  if (!result || result.length === 0) {
    return next({
      message: 'recipe not found',
      code: 404,
    });
  }

  return res.status(200).json(result);
});

const editarReceita = rescue(async (req, res, next) => {
  const { id } = req.params;
  const receitaEditada = req.body;
  const usuario = req.user;
  // console.log(usuario);
  const result = await service.editarReceita(id, receitaEditada, usuario);

  if ('code' in result) {
    return next(result);
  }

  return res.status(200).json(result);
});

const deleteReceita = rescue(async (req, res, _next) => {
  const { id } = req.params;
  await service.deleteReceita(id);

  return res.status(204).json();
});

const adicionarImagem = rescue(async (req, res, next) => {
  const { id } = req.params;
  const usuario = req.user;
  
  const result = await service.adicionarImagem(id, usuario);

  if ('code' in result) {
    return next(result);
  }

  return res.status(200).json(result);
});

module.exports = { 
  cadastrarReceitas,
  buscarReceitas,
  buscarReceitasID,
  editarReceita,
  deleteReceita,
  adicionarImagem,
};