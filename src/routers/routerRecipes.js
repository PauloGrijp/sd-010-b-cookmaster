const express = require('express');

const router = express.Router();
const recipesController = require('../controllers/recipesController');
const validadeJWT = require('../auth/validateJWT');

router.get('/:id', recipesController.getById);
router.post('/', validadeJWT, recipesController.createRecipes);
router.get('/', recipesController.getAll);

module.exports = router;