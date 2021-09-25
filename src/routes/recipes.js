const { Router } = require('express');
const recipesController = require('../controller/recipesController');
const validatejwt = require('../middleware/validateJWT');

const router = Router();

router.post('/recipes', validatejwt, recipesController.create);
router.get('/recipes', recipesController.getAll);

module.exports = router;