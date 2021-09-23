const express = require('express');
const { validateJWT } = require('../../middlewares/jwtMiddlewares');
const { checkValues } = require('../../middlewares/recipesMiddlewares');

const recipesController = require('../../controllers/recipesController');

const router = express.Router();

router.post('/', validateJWT, checkValues, recipesController.addRecipe);
router.get('/', recipesController.getAllRecipes);

module.exports = router;
