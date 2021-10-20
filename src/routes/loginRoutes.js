const express = require('express');

const loginRoutes = express.Router();

const {
  registerLoginController,
} = require('../controllers/loginControllers');

loginRoutes.post('/', registerLoginController);

module.exports = loginRoutes;
