const express = require('express');

const routerLogin = express.Router();
const { loguinVal } = require('../controllers/userController');

routerLogin.post('/', loguinVal );

module.exports = routerLogin;
