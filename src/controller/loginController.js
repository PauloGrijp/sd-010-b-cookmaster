const express = require('express');
const jwt = require('jsonwebtoken');
const verificacaoLogin = require('../middleware/verificacaoLogin');
const createLogin = require('../service/loginService');

const routerLogin = express.Router();

const secret = 'aoba';

routerLogin.post('/', verificacaoLogin, async (req, res, next) => {
  const result = await createLogin(req.body);
  if (result.isError) {
    return next(result);
  }
  console.log(result);
  const { _id, email, role } = result;
  console.log(_id);
  const token = jwt.sign({ _id, email, role }, secret, { expiresIn: '1000000m' });
  return res.status(200).json({ token });
});

module.exports = routerLogin;
