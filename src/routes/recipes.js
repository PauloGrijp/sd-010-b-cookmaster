const express = require('express');

const recipesRouter = express.Router();
const { createUser, getAllRecipes } = require('../controller/users');

recipesRouter.route('/')
  .post(createUser)
  .get(getAllRecipes)

module.exports = recipesRouter;