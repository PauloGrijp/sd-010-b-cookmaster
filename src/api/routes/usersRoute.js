const express = require('express');
const rescue = require('express-rescue');

const controller = require('../controllers/userController');

const route = express.Router();

route.post('/', rescue(controller.create));

module.exports = route;