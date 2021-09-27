const express = require('express');
const routerLogin = express.Router();
const { loguinValidation } = require('../controllers/userController');

loginRoutes.post('/', loguinValidation );

module.exports = routerLogin;
