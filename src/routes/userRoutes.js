const express = require('express');

const usersRoutes = express.Router();
const User = require('../controllers/userController');
const Validation = require('../midd/index');

usersRoutes.post('/',
  Validation.nameValidation, 
  Validation.emailValidation, 
  Validation.passwordValidation,
  Validation.emailCheckExistis,
  Validation.checkRole,
  User.createUser,
);

module.exports = usersRoutes;
