const router = require('express').Router();

const validateToken = require('../middlewares/tokenValidation');
const recipesController = require('../controllers/recipes');

router.get('/recipes', recipesController.getRecipes);
router.get('/recipes/:id', recipesController.getRecipeById);

router.put('/recipes/:id', validateToken, recipesController.editRecipe);

router.post('/recipes', validateToken, recipesController.createRecipe);

router.delete('/recipes/:id', validateToken, recipesController.deleteRecipe);

module.exports = router;