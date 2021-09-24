const express = require('express');

const { routerUsers } = require('../controllers/userController');
const routerLogin = require('../controllers/loginController');
const routerRecipes = require('../controllers/recipesController');

const routers = express.Router();

routers.use('/users', routerUsers);
routers.use('/login', routerLogin);
routers.use('/recipes', routerRecipes);

module.exports = routers;