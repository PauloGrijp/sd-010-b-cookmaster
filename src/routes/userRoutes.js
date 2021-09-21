const { Router } = require('express');
const { createUser } = require('../controllers/userController');
const { validEmail, validName,
  validPassword, validUser } = require('../middlewares/userMiddlewares');

const routes = new Router();

routes.get('/', (_request, response) => {
  response.send();
});

routes.post('/users', validEmail, validName, validPassword, validUser, createUser);

module.exports = routes;