const express = require('express');
const { 
  contRecipes,
  contListRecipes,
 } = require('../controller/recipesController');

const router = express.Router();

router.post('/', contRecipes);
router.get('/', contListRecipes);

module.exports = router;