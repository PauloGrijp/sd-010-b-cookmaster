const { Router } = require('express');
const { createUser } = require('../controllers/users_controller');
const { NameValidation, EmailValidation, EmailExist, PasswordValidation,
} = require('../middlewares/user.middlewares');

const routes = new Router();

routes.post('/users', NameValidation, EmailValidation, EmailExist, PasswordValidation, createUser);

module.exports = routes;