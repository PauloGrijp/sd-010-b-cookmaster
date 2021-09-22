const express = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../auth/validateJWT');
const { create, getAll, getById, update, deleteById,
  putImage } = require('../controllers/recipesController');
const uploadMiddleware = require('../middlewares/upload');

const router = express.Router();

router.route('/:id/image')
  .put(rescue(validateJWT), rescue(uploadMiddleware), rescue(putImage));

router.route('/:id')
  .get(rescue(getById))
  .put(rescue(validateJWT), rescue(update))
  .delete(rescue(validateJWT), rescue(deleteById));

router.route('/')
  .post(rescue(validateJWT), rescue(create))
  .get(rescue(getAll));

module.exports = router;
