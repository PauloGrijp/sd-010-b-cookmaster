const route = require('express').Router();
const rescue = require('express-rescue');
const controllers = require('../controllers/controllersUsers');

route.post('/', rescue(controllers.create));
route.get('/', rescue(controllers.login));

module.exports = route;
