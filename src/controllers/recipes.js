const rescue = require('express-rescue');
const service = require('../services/recipes');

const receitas = rescue(async (req, res, next) => {
  const { body } = req;
  const idUsuario = req.idUser;

  const receita = {
    userId: idUsuario,
    ...body,
  };

  const result = await service.receitas(receita);

  if ('code' in result) {
    return next(result);
  }

  return res.status(201).json(result);
});

module.exports = { 
  receitas,
};