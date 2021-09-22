const express = require('express');
const loginService = require('../services/Login');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService.login({ email, password });

  if (result.fieldError) {
    return res.status(401).json({ message: result.message });
  }

  if (result.loginError) {
    return res.status(401).json({ message: result.message });
  }

  return res.status(200).json({ token: result });
});

module.exports = loginRouter;
