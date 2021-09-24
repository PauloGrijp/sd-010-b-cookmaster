const express = require('express');
const jwt = require('jsonwebtoken');

const secret = 'o palmeiras não tem mundial';

const validateLogin = require('../middlewares/validateLogin');
const { createServiceLogin } = require('../services/loginService');
const { getUserByEmail } = require('../services/loginService');

const routerLogin = express.Router();

routerLogin.post('/', validateLogin, async (req, res, next) => {
  const { email, password } = req.body;

  const result = await createServiceLogin(email, password);
  console.log(result.message);

  if (result.isError) {
    return next(result);
  }
  const { _id, email: em, role } = await getUserByEmail(email);

  const payload = {
    _id,
    em,
    role,
  };

  const token = jwt.sign(payload, secret, { expiresIn: '45m' });

  return res.status(200).json({ token });
});

module.exports = routerLogin;