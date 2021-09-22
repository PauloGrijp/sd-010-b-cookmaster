const express = require('express');

const userRoute = (controller) => {
  const route = express.Router();

  route.get('/', (_req, res) => {
    res.send('ok');
  });

  route.post('/', controller.insertData);

  return route;
};

module.exports = userRoute;
