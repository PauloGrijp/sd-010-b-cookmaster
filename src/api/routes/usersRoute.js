const express = require('express');
const { validateUser, authenticateMiddleware } = require('../middlewares');

const userRoute = (controller) => {
  const route = express.Router();

  route.post('/', validateUser, controller.insertData);

  route.post('/admin', validateUser, authenticateMiddleware, controller.insertAdmin);

  return route;
};

module.exports = userRoute;
