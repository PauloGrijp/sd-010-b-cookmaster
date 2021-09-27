const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/users', middlewares.doubleEmail, controllers.postUsersController);

router.post('/login', controllers.login);

router.post('/recipes', middlewares.validateToken, controllers.postRecipeController);

router.get('/recipes', controllers.getRecipesController);

router.get('/recipes/:id', controllers.getRecipeByIdController);

module.exports = router;
