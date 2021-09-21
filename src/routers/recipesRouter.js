const express = require('express');

const router = express.Router();

const recipesController = require('../controllers/recipesController');

const validateJWT = require('../middlewares/validateJWT');

router.post('/',
recipesController.verifyRecipe,
validateJWT,
recipesController.createRecipe);

module.exports = router;