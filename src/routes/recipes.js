const express = require('express');

const router = express.Router();

const authJWT = require('../middleweres/validateJWT');

const { create, getAll, getById, remove, update } = require('../controllers/recipes');

router.route('/')
  .get(getAll)
  .post(authJWT, create);

router.route('/:id')
  .get(getById)
  .put(authJWT, update)
  .delete(authJWT, remove);

module.exports = router;
