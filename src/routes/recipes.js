const express = require('express');

const recipesRouter = express.Router();
const { createUser, getAllRecipes } = require('../controller/users');

recipesRouter.route('/').post(createUser);

recipesRouter.route('/').get(getAllRecipes);

module.exports = recipesRouter;
