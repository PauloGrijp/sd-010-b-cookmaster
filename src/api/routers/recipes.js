const express = require('express');
const multer = require('multer');

const { jwtValidation } = require('../../middlewares/jwtValidations');
const { recipesValidations } = require('../../middlewares/recipesValidations');
const recipesController = require('../../controller/recipesController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const uploadFile = multer({ storage });

router.put('/:id/image', jwtValidation, uploadFile.single('image'), recipesController.recipeImage);
router.post('/', jwtValidation, recipesValidations, recipesController.add);
router.get('/:id', recipesController.getById);
router.put('/:id', recipesController.update);
router.delete('/:id', recipesController.remove);
router.get('/', recipesController.getAll);

module.exports = router;