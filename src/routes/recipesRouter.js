const { Router } = require('express');

const recipeController = require('../controllers/recipesController');

const router = Router();

router.post('/recipes', recipeController);

module.exports = router;