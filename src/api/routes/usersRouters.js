const express = require('express');
const rescue = require('express-rescue');

const usersRouter = express.Router();

const userController = require('../controllers/usersController');

usersRouter.post('/', rescue(userController.addUser));
usersRouter.get('/', userController.userByAll);
// usersRouter.get('/', (req, res) => res.send('heloo'));

module.exports = usersRouter;