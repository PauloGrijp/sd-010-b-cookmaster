const express = require('express');
const usersRoutes = express.Router();
const { createUser } = require('../controllers/usersControllers');
const Validation = require('../midd/index');

usersRoutes.post('/',
  Validation.nameValidation, 
  Validation.emailValidation, 
  Validation.passwordValidation,
  Validation.emailCheckExistis,
  Validation.checkRole,
  createUser
);


module.exports = usersRoutes;
