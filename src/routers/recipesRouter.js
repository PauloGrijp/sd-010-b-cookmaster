const express = require('express');

const { validateJWT } = require('../auth/validateJWT');

const { 
  createRecipe, 
  getAllRecipes,
  getRecipeById,
} = require('../controllers/recipesController');

const router = express.Router();

router.route('/')
  .post(validateJWT, createRecipe)
  .get(getAllRecipes);

router.route('/:id')
.get(getRecipeById);

module.exports = router;