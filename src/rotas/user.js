const express = require('express');
const { validadesUsers } = require('../midd/validade');
const Users = require('../controllers/user');

const UsersRouter = express.Router();

UsersRouter.post('/', validadesUsers, Users.createUser);

module.exports = UsersRouter;
