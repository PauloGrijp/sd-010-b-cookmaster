const express = require('express');

const { routerUsers } = require('../controllers/userController');

const routers = express.Router();

routers.use('/users', routerUsers);

module.exports = routers;