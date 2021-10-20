const express = require('express');

const recipesRoutes = express.Routes();

const {
  registerRecipesController,
  listAllRecipesController,
  findRecipesController,
  updateRecipesController,
  deleteRecipesController,
  addImageRecipesController,
} = require('../controllers/recipesControllers');

recipesRoutes.post('/', registerRecipesController);
recipesRoutes.get('/:id', findRecipesController);
recipesRoutes.get('/', listAllRecipesController);
recipesRoutes.put('/:id', updateRecipesController);
recipesRoutes.delete('/:id', deleteRecipesController);
recipesRoutes.put('/:id/image', addImageRecipesController);

module.exports = recipesRoutes;
