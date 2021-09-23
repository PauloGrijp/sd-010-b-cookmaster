const express = require('express');
const validateToken = require('../middlewares/token');

const User = require('../controllers/Users');
const Login = require('../controllers/Login');
const Recipes = require('../controllers/Recipes');

const router = express.Router();

router.post('/users', User.createUser);

router.post('/login', Login.login);

router.post('/recipes', validateToken, Recipes.createRecipe);
router.get('/recipes', Recipes.getAllRecipes);
router.get('/recipes/:id', Recipes.getRecipeById);

module.exports = router; 