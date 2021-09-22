const express = require('express');

const { 
  validateFields,
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  authUser,
  removeRecipe,
} = require('../controllers/recipesController');

const validateToken = require('../middlewares/validateJwt');

const router = express.Router();

router.post('/', validateToken, validateFields, createRecipe);

router.get('/', getAllRecipes);

router.get('/:id', getRecipe);

router.put('/:id', validateToken, authUser, updateRecipe);

router.delete('/:id', validateToken, authUser, removeRecipe);

module.exports = router;
