const express = require('express');
const Recipes = require('../controllers/recipesControllers');
const validateJWT = require('../middlewares/authorization');
const upload = require('../middlewares/upload');

const router = express.Router();

const OK = 200;

router.put('/:id/image',
  validateJWT,
  Recipes.upload,
  upload.single('image'),
  (req, res) => res.status(OK).json(req.recipe));
router.get('/:id', Recipes.getById);
router.put('/:id', validateJWT, Recipes.update);
router.delete('/:id', validateJWT, Recipes.remove);
router.get('/', Recipes.get);
router.post('/', validateJWT, Recipes.create);

module.exports = router;
