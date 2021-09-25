const express = require('express');
const { create } = require('../service/usersService');
const verificarUsers = require('../middleware/verificacaoCreate');

const routerUsers = express.Router();

routerUsers.post('/', verificarUsers, async (req, res, next) => {
  const result = await create(req.body);
  if (result.isError) {
    return next(result);
  }
  const { name, email } = req.body;
  return res.status(201).json({ user: { name, email, ...result } });
});

module.exports = routerUsers;
