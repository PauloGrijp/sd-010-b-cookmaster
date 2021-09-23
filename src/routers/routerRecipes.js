const express = require('express');

const router = express.Router();
const recipesController = require('../controllers/recipesController');

router.post('/', recipesController.createRecipes);

module.exports = router;