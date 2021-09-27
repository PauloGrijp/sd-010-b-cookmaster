const express = require('express');
const multer = require('multer');
const path = require('path');
const { validateJWT } = require('../../middlewares/jwtMiddlewares');
const { checkValues } = require('../../middlewares/recipesMiddlewares');
const recipesController = require('../../controllers/recipesController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const uploadFile = multer({ storage });

router.get('/:id', recipesController.getRecipeById);

router.get('/', recipesController.getAllRecipes);

router.post('/', validateJWT, checkValues, recipesController.addRecipe);

router.put(
  '/:id/image',
  validateJWT,
  uploadFile.single('image'),
  recipesController.uploadFile,
);

router.put('/:id', validateJWT, recipesController.updateRecipe);

router.delete('/:id', validateJWT, recipesController.deleteRecipe);

module.exports = router;
