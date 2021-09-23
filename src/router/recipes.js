const express = require('express');
const { 
  contRecipes,
 } = require('../controller/recipesController');

const router = express.Router();

router.post('/', contRecipes);

module.exports = router;