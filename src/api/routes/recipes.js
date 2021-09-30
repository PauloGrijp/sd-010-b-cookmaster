const route = require('express').Router();
const rescue = require('express-rescue');
const validationToken = require('../utils/validations/validationsToken');
const controllers = require('../controllers/controllersRecipes');
const uploadFile = require('../middlewares/uploadFile');

route.post('/', rescue(validationToken), rescue(controllers.create));
route.get('/', rescue(controllers.getAll));
route.get('/:id', rescue(controllers.getById));
route.put('/:id', rescue(validationToken), rescue(controllers.updateById));
route.delete('/:id', rescue(validationToken), rescue(controllers.deleteById));
route.put('/:id/image', rescue(validationToken), uploadFile, rescue(controllers.addUrlImage));

module.exports = route;
