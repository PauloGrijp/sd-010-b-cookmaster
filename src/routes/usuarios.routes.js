const { Router } = require('express');
const { 
  userExists,
  verifyPassword,
  verifyName,
  verifyEmail,
  verifyEmailToLogin,
  verifyPasswordToLogin,
  isAdmin,
 } = require('../middlewares/usuarios.meddlewares');

const { validaToken } = require('../middlewares/recipes.middlewares');

const { createUser, requestLogin, createAdmin } = require('../controllers/usuarios.controller');

const routes = new Router();

routes.get('/', (_request, response) => {
  response.send();
});

routes.post('/users', 
  verifyName,
    verifyEmail,
      verifyPassword,
        userExists, 
          createUser);

routes.post('/login', 
  verifyEmailToLogin,
    verifyPasswordToLogin,
      requestLogin);

routes.post('/users/admin', 
  validaToken,
    isAdmin,
      createAdmin);

module.exports = routes;