const express = require('express');
const { validateUser } = require('../middlewares');

const userRoute = (controller) => {
  const route = express.Router();

  route.post('/', validateUser, controller.insertData);

  return route;
};

module.exports = userRoute;
