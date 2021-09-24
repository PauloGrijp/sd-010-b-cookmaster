const router = require('express').Router();
const RecipesController = require('../controllers/recipesController');
const { tokenValidator } = require('../middlewares/tokenValidator');
const { validateInputs } = require('../middlewares/recipesMiddleware');

router.get('/', RecipesController.getAll);
router.get('/:id', RecipesController.getById);
router.post('/', tokenValidator, validateInputs, RecipesController.create);

module.exports = router;
