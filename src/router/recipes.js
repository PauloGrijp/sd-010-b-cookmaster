const express = require('express');
const { 
  contRecipes,
  contListRecipes,
  contListByID,
  contUpdate,
  contImageCreate,
  contEraser,
 } = require('../controller/recipesController');

const router = express.Router();

router.post('/', contRecipes);
router.get('/', contListRecipes);
router.get('/:id', contListByID);
router.put('/:id', contUpdate);
router.put('/:id/image', contImageCreate);
router.delete('/:id', contEraser);

module.exports = router;