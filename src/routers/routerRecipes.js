const express = require('express');

const router = express.Router();
const recipesController = require('../controllers/recipesController');
const validadeJWT = require('../auth/validateJWT');

router.post('/', validadeJWT, recipesController.createRecipes);
router.get('/', recipesController.getAll);

module.exports = router;