const express = require('express');

const { validateToken } = require('../midlewares/validateToken');
const { myMulter } = require('../midlewares/multer');
const recipesController = require('../Controller/recipesController');

const router = express.Router();

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);
router.post('/',
    validateToken,
    recipesController.createRecipe);
router.put('/:id',
    validateToken,
    recipesController.updateRecipe);
router.delete('/:id',
    validateToken,
    recipesController.deleteRecipe);
router.put('/:id/image',
    validateToken,
    myMulter.single('image'),
    recipesController.uploadPicture);

module.exports = router;