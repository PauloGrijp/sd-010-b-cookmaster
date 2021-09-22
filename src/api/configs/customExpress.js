const express = require('express');
const { errorMiddleware } = require('../middlewares/error');
const Mongo = require('../utils/database/Mongo');
const Configure = require('./Configure');

const customExpress = async () => {
  await Mongo.main();
  const { db } = Mongo;
  const controllers = Configure.injection(db);
  const routes = Configure.routes(controllers);

  const app = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/users', routes.user);
  app.use('/login', routes.login);

  app.get('/', (_request, response) => {
    response.send();
  });

  app.use(errorMiddleware);

  return app;
};

module.exports = customExpress;