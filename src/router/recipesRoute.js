const router = require('express').Router();

const RecipesController = require('../controllers/recipesController');
const { tokenValidator } = require('../middlewares/tokenValidator');
const { validateInputs, uploads } = require('../middlewares/recipesMiddleware');

router.get('/', RecipesController.getAll);
router.get('/:id', RecipesController.getById);
router.put('/:id', tokenValidator, RecipesController.update);
router.put('/:id/image', tokenValidator, uploads.single('image'), RecipesController.uploadPhoto);
router.post('/', tokenValidator, validateInputs, RecipesController.create);
router.delete('/:id', tokenValidator, RecipesController.deleteRecipe);

module.exports = router;
