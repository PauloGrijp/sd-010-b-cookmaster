const express = require('express');

const routerLogin = express.Router();
const { dar } = require('../controllers/userController');

routerLogin.post('/', dar);  

module.exports = routerLogin;
