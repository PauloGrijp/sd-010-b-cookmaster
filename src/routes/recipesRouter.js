const { Router } = require('express');

const recipesContoller = require('../controllers/recipesController');
const authMiddleware = require('../middleware/validateJWT');

const router = Router();

router.post('/recipes', authMiddleware, recipesContoller.create);

module.exports = router;