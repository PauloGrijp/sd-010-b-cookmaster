const router = require('express').Router();
const RecipesController = require('../controllers/recipesController');
const { tokenValidator } = require('../middlewares/tokenValidator');

router.post('/', tokenValidator, RecipesController.create);

module.exports = router;
