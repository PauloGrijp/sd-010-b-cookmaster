const express = require('express');

const usersRoutes = express.Router();

const {
  registerCommonUserController,
  registerAdminUserController,
} = require('../controllers/usersControllers');

usersRoutes.post('/', registerCommonUserController);
usersRoutes.post('/admin', registerAdminUserController);

module.exports = usersRoutes;
