const express = require('express');

const router = express.Router();

const recipesController = require('../controllers/recipesController');

const validateJWT = require('../middlewares/validateJWT');

router.post('/',
validateJWT,
recipesController.verifyRecipe,
recipesController.createRecipe);

router.get('/',
recipesController.getAll);

router.get('/:id', 
recipesController.getById);

router.put('/:recipeId', 
validateJWT,
recipesController.updateRecipe);

module.exports = router;