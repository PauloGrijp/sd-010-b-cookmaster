const router = require('express').Router();
const { validateJWT } = require('../middlewares');
const { recipesController } = require('../controllers');

router.post('/', validateJWT, recipesController.createRecipe);
router.get('/:id', recipesController.findRecipe);
router.get('/', recipesController.getRecipes);
router.put('/:id/image', validateJWT, recipesController.updateImage);
router.put('/:id', validateJWT, recipesController.updateRecipe);
router.delete('/:id', validateJWT, recipesController.deleteRecipe);

module.exports = router;
