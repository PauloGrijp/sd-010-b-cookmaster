const express = require('express');

const loginRoutes = express.Router();

const { loginControllers } = require('../controllers');

loginRoutes.post('/', loginControllers);

module.exports = loginRoutes;
