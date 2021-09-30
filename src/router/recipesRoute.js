const router = require('express').Router();

const RecipesController = require('../controllers/recipesController');
const { tokenValidator } = require('../middlewares/tokenValidator');
const { validateInputs, uploads } = require('../middlewares/recipesMiddleware');

router.put('/:id/image', tokenValidator, uploads.single('image'), RecipesController.uploadPhoto);
router.put('/:id', tokenValidator, RecipesController.update);
router.get('/:id', RecipesController.getById);
router.delete('/:id', tokenValidator, RecipesController.deleteRecipe);
router.post('/', tokenValidator, validateInputs, RecipesController.create);
router.get('/', RecipesController.getAll);

module.exports = router;
