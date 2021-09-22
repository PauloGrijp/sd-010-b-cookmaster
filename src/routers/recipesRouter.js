const express = require('express');

const { validateJWT } = require('../auth/validateJWT');

const { 
  createRecipe, 
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipesController');

const router = express.Router();

router.route('/')
  .post(validateJWT, createRecipe)
  .get(getAllRecipes);

router.route('/:id')
.get(getRecipeById)
.put(validateJWT, updateRecipe)
.delete(validateJWT, deleteRecipe);

module.exports = router;