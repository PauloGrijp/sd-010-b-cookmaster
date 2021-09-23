const express = require('express');
const { 
  contRecipes,
  contListRecipes,
  contListByID,
 } = require('../controller/recipesController');

const router = express.Router();

router.post('/', contRecipes);
router.get('/', contListRecipes);
router.get('/:id', contListByID);

module.exports = router;