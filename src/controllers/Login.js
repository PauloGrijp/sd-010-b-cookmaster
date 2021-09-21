const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { loginValidate } = require('../middlewares');
const Login = require('../services/Login');
const JWT_SECRET = require('../utils/secret');
const { SUCCESS } = require('../utils/statusCode');

const login = express.Router();

login.post( 
  '/',
  loginValidate,
  rescue(async (req, res, next) => {
    const { email: emailUser, password } = req.body;
    const verify = await Login.verify(emailUser, password);
    const { _id: id, email, role } = verify || {};
    if (verify.isError) return next(verify);
    const payload = { id, email, role };
    const token = jwt.sign(payload, JWT_SECRET);
    return res.status(SUCCESS).json({ token });
  }),
);

module.exports = login;
