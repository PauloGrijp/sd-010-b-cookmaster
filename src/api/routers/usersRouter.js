const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.post('/', rescue(usersController.createUser));

module.exports = usersRouter;
