const express = require('express');
const { validateLogin } = require('../middlewares');

const loginRoute = (controller) => {
  const route = express.Router();
  route.post('/', validateLogin, controller.authenticate);

  return route;
};

module.exports = loginRoute;
