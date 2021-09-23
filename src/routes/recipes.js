const express = require('express');
const validateJWT = require('../auth/validateJWT');
const { create, getAll, getById, update, deleteById,
  putImage } = require('../controllers/recipesController');
const uploadMiddleware = require('../middlewares/upload');

const router = express.Router();

router.route('/:id/image')
  .put(validateJWT, uploadMiddleware, putImage);

router.route('/:id')
  .get(getById)
  .put(validateJWT, update)
  .delete(validateJWT, deleteById);

router.route('/')
  .post(validateJWT, create)
  .get(getAll);

module.exports = router;
