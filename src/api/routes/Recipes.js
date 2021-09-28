const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { createRecipe, getAllRecipes } = require('../controllers/Recipes');

const router = express.Router();

router.route('/')
  .post(
    validateJWT,
    createRecipe,
  )
  .get(
    getAllRecipes,
  );

module.exports = router;
