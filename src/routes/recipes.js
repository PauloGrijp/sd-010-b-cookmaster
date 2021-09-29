const express = require('express');

const router = express.Router();

const upload = require('../middleweres/upload');
const authJWT = require('../middleweres/validateJWT');

const { create, getAll, getById, remove, update, uploadImg } = require('../controllers/recipes');

router.route('/')
  .get(getAll)
  .post(authJWT, create);

router.route('/:id')
  .get(getById)
  .put(authJWT, update)
  .delete(authJWT, remove);

router.route('/:id/image')
  .post(authJWT, upload.single('image'), uploadImg);

module.exports = router;
