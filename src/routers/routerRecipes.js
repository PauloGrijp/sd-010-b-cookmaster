const express = require('express');

const multer = require('multer');

const router = express.Router();
const recipesController = require('../controllers/recipesController');
const validadeJWT = require('../auth/validateJWT');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    const newFileName = `${id}.jpeg`;
    callback(null, newFileName);
  },
});

const upload = multer({ storage });

router.put('/:id/image', validadeJWT, upload.single('image'), recipesController.addImage);
router.get('/:id', recipesController.getById);
router.put('/:id', validadeJWT, recipesController.update);
router.delete('/:id', validadeJWT, recipesController.exclude);
router.post('/', validadeJWT, recipesController.createRecipes);
router.get('/', recipesController.getAll);

module.exports = router;