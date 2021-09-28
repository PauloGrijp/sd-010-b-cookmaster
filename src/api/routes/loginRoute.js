const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/loginController');

const route = express.Router();

route.post('/', rescue(controller.checkUserEmail));

module.exports = route;