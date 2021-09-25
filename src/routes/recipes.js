const express = require('express');
const multer = require('multer');

// const upload = require('../api/schemas');

const upload = multer({ dest: 'src/uploads/' });
const {
  create,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  recipeImg,
} = require('../controllers/recipes');

const route = express.Router();
route.put('/:id/image', upload.single('image'), recipeImg);
route.delete('/:id', deleteRecipe);
route.get('/:id', getRecipeById);
route.put('/:id', updateRecipe);
route.get('/', getAllRecipes);
route.post('/', create);

module.exports = route;