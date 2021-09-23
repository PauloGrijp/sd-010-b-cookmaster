const express = require('express');

const router = express.Router();
const recipesController = require('../controllers/recipesController');
const validadeJWT = require('../auth/validateJWT');

router.get('/:id', recipesController.getById);
router.put('/:id', validadeJWT, recipesController.update);
router.delete('/:id', validadeJWT, recipesController.exclude);
router.post('/', validadeJWT, recipesController.createRecipes);
router.get('/', recipesController.getAll);

module.exports = router;