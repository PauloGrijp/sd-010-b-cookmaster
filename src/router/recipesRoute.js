const router = require('express').Router();
const RecipesController = require('../controllers/recipesController');
const { tokenValidator } = require('../middlewares/tokenValidator');
const { validateInputs } = require('../middlewares/recipesMiddleware');

router.post('/', tokenValidator, validateInputs, RecipesController.create);
router.get('/', RecipesController.getAll);

module.exports = router;
