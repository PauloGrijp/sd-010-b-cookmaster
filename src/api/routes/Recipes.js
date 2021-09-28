const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} = require('../controllers/Recipes');

const router = express.Router();

router.route('/')
  .post(
    validateJWT,
    createRecipe,
  )
  .get(
    getAllRecipes,
  );

router.route('/:id')
  .get(
    getRecipeById,
  )
  .put(
    validateJWT,
    updateRecipe,
  );

module.exports = router;