const usersRoute = require('express').Router();
const rescue = require('express-rescue');

const UserController = require('../controllers/users.controller');

usersRoute.post('/', rescue(UserController.createUser));

module.exports = usersRoute;