const { Router } = require('express');
const upload = require('../middleware/multer');
const recipesController = require('../controller/recipesController');
const validatejwt = require('../middleware/validateJWT');

const router = Router();

router.get('/recipes/:id', recipesController.findById);
router.put('/recipes/:id', validatejwt, recipesController.update);
router.delete('/recipes/:id', validatejwt, recipesController.remove);
router.put('/recipes/:id/image', validatejwt, upload.single('image'), recipesController.image);
router.post('/recipes', validatejwt, recipesController.create);
router.get('/recipes', recipesController.getAll);

module.exports = router;