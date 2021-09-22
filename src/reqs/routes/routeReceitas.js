const express = require('express');

const router = express.Router();
const { createRecipe, recipeList } = require('../controllers/recipes');
const { validateJWT } = require('../middleware/validadeJwt');
const { verifyName } = require('../middleware/validations');
const { validIngre, validPreparation } = require('../middleware/validadeRecipe');

router.post('/', verifyName, validIngre, validPreparation, validateJWT, createRecipe);
router.get('/', recipeList);

module.exports = router;
