const { Router } = require('express');

const recipesContoller = require('../controllers/recipesController');
const authMiddleware = require('../middleware/validateJWT');

const router = Router();

router.delete('/recipes/:id', authMiddleware, recipesContoller.deleteRecipe);
router.put('/recipes/:id', authMiddleware, recipesContoller.update);
router.get('/recipes/:id', recipesContoller.getRecipe);
router.post('/recipes', authMiddleware, recipesContoller.create);
router.get('/recipes', recipesContoller.AllRecipes);

module.exports = router;