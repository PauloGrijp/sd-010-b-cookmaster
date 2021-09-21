const express = require('express');
const recipesController = require('../Controller/recipesController');
const { validateToken } = require('../midlewares/validateToken');

const router = express.Router();

router.get('/', recipesController.getAll);
router.post('/', 
validateToken,
recipesController.createRecipe);

module.exports = router;