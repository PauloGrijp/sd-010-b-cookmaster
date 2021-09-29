const route = require('express').Router();
const rescue = require('express-rescue');
const validationToken = require('../utils/validations/validationsToken');
const controllers = require('../controllers/controllersRecipes');

route.post('/', rescue(validationToken), rescue(controllers.create));
route.get('/', rescue(controllers.getAll));
route.get('/:id', rescue(controllers.getById));
route.put('/:id', rescue(validationToken), rescue(controllers.updateById));

module.exports = route;
