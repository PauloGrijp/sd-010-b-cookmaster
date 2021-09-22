const express = require('express');

const router = express.Router();

const {
  validateFields,
  createRecipe,
  getAllRecipes,
  getRecipeById,
} = require('../../controllers/recipesController');

const validateJWT = require('../../middlewares/validateJWT');

router.post('/',
   validateJWT,
  validateFields,
  createRecipe);

router.get('/', getAllRecipes);

router.get('/:id', getRecipeById);

router.put('/:id');

module.exports = router;