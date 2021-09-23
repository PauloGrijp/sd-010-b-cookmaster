const route = require('express').Router();
const rescue = require('express-rescue');
const controllers = require('../controllers/controllersUsers');

route.get('/', rescue(controllers.login));

module.exports = route;
