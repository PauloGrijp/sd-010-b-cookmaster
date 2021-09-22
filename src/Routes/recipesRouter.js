const express = require('express');
const recipesController = require('../Controller/recipesController');
const { validateToken } = require('../midlewares/validateToken');

const router = express.Router();

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);
router.post('/', 
validateToken,
recipesController.createRecipe);
router.put('/:id', 
validateToken,
recipesController.updateRecipe);
router.delete('/:id', 
validateToken,
recipesController.deleteRecipe);

module.exports = router;