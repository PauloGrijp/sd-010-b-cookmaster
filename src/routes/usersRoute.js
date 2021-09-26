const express = require('express');

const usersController = require('../controllers/usersController');

const route = express.Router();

route.post('/', usersController.createUser);

module.exports = route;