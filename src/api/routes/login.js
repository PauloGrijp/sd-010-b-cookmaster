const route = require('express').Router();
const rescue = require('express-rescue');
const controllers = require('../controllers/controllersLogin');

route.post('/', rescue(controllers.login));

module.exports = route;
