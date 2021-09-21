const rescue = require('express-rescue');
const service = require('../services/user');

const cadastrarUsuario = rescue(async (req, res, next) => {
  const user = req.body;
  const result = await service.cadastrarUsuario(user);

  if ('code' in result) {
    return next(result);
  }

  return res.status(201).json(result);
});

module.exports = { 
  cadastrarUsuario,
};