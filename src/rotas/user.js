const express = require('express');
const { validatesUsers } = require('../midd/validate');
const Users = require('../controllers/user');

const UsersRouter = express.Router();

UsersRouter.post('/', validatesUsers, Users.createUser);

module.exports = UsersRouter;
