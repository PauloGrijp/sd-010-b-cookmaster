const express = require('express');

const { jwtValidation } = require('../../middlewares/jwtValidations');
const { recipesValidations } = require('../../middlewares/recipesValidations');
const recipesController = require('../../controller/recipesController');

const router = express.Router();

router.post('/', jwtValidation, recipesValidations, recipesController.add);
router.get('/:id', recipesController.getById);
router.get('/', recipesController.getAll);

module.exports = router;