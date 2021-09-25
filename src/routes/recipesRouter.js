const { Router } = require('express');
const multer = require('multer');

const recipesContoller = require('../controllers/recipesController');
const authMiddleware = require('../middleware/validateJWT');

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

router.put(
  '/recipes/:id/image', authMiddleware, upload.single('image'), recipesContoller.uploadImage,
);
router.delete('/recipes/:id', authMiddleware, recipesContoller.deleteRecipe);
router.put('/recipes/:id', authMiddleware, recipesContoller.update);
router.get('/recipes/:id', recipesContoller.getRecipe);
router.post('/recipes', authMiddleware, recipesContoller.create);
router.get('/recipes', recipesContoller.AllRecipes);

module.exports = router;