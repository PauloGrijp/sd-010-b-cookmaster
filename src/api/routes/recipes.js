const route = require('express').Router();
const rescue = require('express-rescue');
const validationToken = require('../utils/validations/validationsToken');
const controllers = require('../controllers/controllersRecipes');

route.post('/', rescue(validationToken), rescue(controllers.create));

module.exports = route;
