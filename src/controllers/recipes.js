const rescue = require('express-rescue');
const service = require('../services/recipes');
const model = require('../models/recipes');

const cadastrarReceitas = rescue(async (req, res, next) => {
  const { body } = req;
  const idUsuario = req.idUser;

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

module.exports = { 
  cadastrarReceitas,
  buscarReceitas,
};