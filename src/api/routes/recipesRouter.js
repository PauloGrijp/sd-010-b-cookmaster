const express = require('express');

const router = express.Router();

const {
  validateFields,
  createRecipe,
  getAllRecipes,
} = require('../../controllers/recipesController');

// const validateJWT = require('../../middlewares/validateJWT');

router.post('/',
  // validateJWT,
  validateFields,
  createRecipe);

router.get('/', getAllRecipes);

module.exports = router;