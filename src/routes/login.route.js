const loginRoute = require('express').Router();
const rescue = require('express-rescue');

const UserController = require('../controllers/users.controller');

loginRoute.post('/', rescue(UserController.login));

module.exports = loginRoute;