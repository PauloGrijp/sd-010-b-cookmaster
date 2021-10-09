const router = require('express').Router();
const multer = require('multer');

const validateToken = require('../middlewares/tokenValidation');
const recipesController = require('../controllers/recipes');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

router.get('/recipes', recipesController.getRecipes);
router.get('/recipes/:id', recipesController.getRecipeById);

router.put('/recipes/:id', validateToken, recipesController.editRecipe);
router.put(
  '/recipes/:id/image',
  validateToken,
  upload.single('image'),
  recipesController.uploadImage,
);

router.post('/recipes', validateToken, recipesController.createRecipe);

router.delete('/recipes/:id', validateToken, recipesController.deleteRecipe);

module.exports = router;