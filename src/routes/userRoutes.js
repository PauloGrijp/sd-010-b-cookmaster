const { Router } = require('express');
const { createUser, loginRequest } = require('../controllers/userController');
const { validEmail, validName,
  validPassword, validUser,
  validEmailLogin, validPasswordLogin } = require('../middlewares/userMiddlewares');

const routes = new Router();

routes.get('/', (_request, response) => {
  response.send();
});

routes.post('/users', validEmail, validName, validPassword, validUser, createUser);
routes.post('/login', validEmailLogin, validPasswordLogin, loginRequest);

module.exports = routes;