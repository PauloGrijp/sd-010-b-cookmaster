const express = require('express');
const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const Login = require('../services/loginServices');

const login = express.Router();
const validateEmailPassword = require('../middlewares/loginMiddlewares');

const secret = 'minha-senha';
const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

login.post('/',
  validateEmailPassword,
  rescue(async (req, res) => {
    const { email: userEmail, password } = req.body;
    const checkLogin = await Login.findUser(userEmail, password);
    if (checkLogin.isError) {
      return res.status(checkLogin.code).json({ message: checkLogin.message });
    }
    const { _id, email, role } = checkLogin;
    const payload = { _id, email, role };
    const token = jwt.sign(payload, secret, jwtConfig);
    return res.status(StatusCodes.OK).json({ token });
})); 

module.exports = login;