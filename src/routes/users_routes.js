const { Router } = require('express');
const { createUser, LoginUser } = require('../controllers/users_controller');
const { NameValidation, EmailValidation, EmailExist, PasswordValidation, EmailValidationLogin,
    PasswordValidationLogin,
} = require('../middlewares/user.middlewares');

const routes = new Router();

routes.post('/users', NameValidation, EmailValidation, EmailExist, PasswordValidation, createUser);
routes.post('/login', EmailValidationLogin,
PasswordValidationLogin, LoginUser);

module.exports = routes;