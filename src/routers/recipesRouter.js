const express = require('express');

const { validateJWT } = require('../auth/validateJWT');

const { createRecipe } = require('../controllers/recipesController');

const router = express.Router();

router.route('/')
  .post(validateJWT, createRecipe);

module.exports = router;