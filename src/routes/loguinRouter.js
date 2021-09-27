const express = require('express');

const routerLogin = express.Router();
const { login } = require('../controllers/userController');

routerLogin.post('/', login);  

module.exports = routerLogin;
