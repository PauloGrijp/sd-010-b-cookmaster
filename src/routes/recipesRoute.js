const express = require('express');

const { 
  validateFields,
  createRecipe,
  getAllRecipes,
  getRecipe,
} = require('../controllers/recipesController');

const validateToken = require('../middlewares/validateJwt');

const router = express.Router();

router.post('/', validateToken, validateFields, createRecipe);

router.get('/', getAllRecipes);

router.get('/:id', getRecipe);

module.exports = router;
