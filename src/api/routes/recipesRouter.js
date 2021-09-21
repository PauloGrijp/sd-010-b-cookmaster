const express = require('express');

const recipesRouter = express.Router();

recipesRouter.post('/recipes');

module.exports = recipesRouter;