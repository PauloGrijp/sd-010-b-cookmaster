const express = require('express');
const jwt = require('jsonwebtoken');

const secret = 'senha-secreta';

const loginRouter = express.Router();
const loginService = require('../services/Login');

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService.doneLogin({ email, password });

  if (result.fieldError) return res.status(401).json({ message: result.message });
  if (result.loginError) return res.status(401).json({ message: result.message });

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { _id: id, role } = result;

  const payload = { email, id, role };

  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = loginRouter;