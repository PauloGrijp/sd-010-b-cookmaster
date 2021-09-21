const express = require('express');
const Mongo = require('../utils/database/Mongo');

const customExpress = async () => {
  await Mongo.main();
  const { db } = Mongo;

  const app = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (_request, response) => {
    response.send();
  });

  return app;
};

module.exports = customExpress;