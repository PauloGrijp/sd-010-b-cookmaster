const router = require('express').Router();

const validateToken = require('../middlewares/tokenValidation');
const recipesController = require('../controllers/recipes');

router.get('/recipes', recipesController.getRecipes);
router.get('/recipes/:id', recipesController.getRecipeById);
router.post('/recipes', validateToken, recipesController.createRecipe);

module.exports = router;