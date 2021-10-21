const express = require('express');
const { recipesControllers } = require('../controllers');
const {
  multerStorage,
  validateJWT,
} = require('../middlewares');

const router = express.Router();

router.put('/:id/image',
  validateJWT,
  recipesControllers.upload,
  multerStorage.single('image'),
  (req, res) => res.status(200).json(req.recipe));
router.get('/:id', recipesControllers.getById);
router.put('/:id', validateJWT, recipesControllers.update);
router.delete('/:id', validateJWT, recipesControllers.remove);
router.get('/', recipesControllers.get);
router.post('/', validateJWT, recipesControllers.create);

module.exports = router;
