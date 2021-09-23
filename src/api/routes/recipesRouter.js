const express = require('express');
  
const router = express.Router();

const {
  validateFields,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  excludeRecipe,
  uploadImage,
} = require('../../controllers/recipesController');

const validateJWT = require('../../middlewares/validateJWT');

const validateUpload = require('../../middlewares/uploadImage');

router.post('/',
  validateJWT,
  validateFields,
  createRecipe);

router.get('/', getAllRecipes);

router.get('/:id', getRecipeById);

router.put('/:id', validateJWT, editRecipe);

router.delete('/:id', validateJWT, excludeRecipe);

router.put('/:id/image', validateJWT, validateUpload, uploadImage);

module.exports = router;