const express = require('express');
const { createRecipe } = require('../controllers/recipesController');
const validateJWT = require('../auth/validationJWT');

const router = express.Router();

router.route('/')
  .post(
    validateJWT,
    createRecipe,
  );

  module.exports = router;