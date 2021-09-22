const express = require('express');

const { validateFields, createRecipe, getAllRecipes } = require('../controllers/recipesController');

const validateToken = require('../middlewares/validateJwt');

const router = express.Router();

router.post('/', validateToken, validateFields, createRecipe);

router.get('/', getAllRecipes);

module.exports = router;
