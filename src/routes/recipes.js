const express = require('express');

const router = express.Router();

const authJWT = require('../middleweres/validateJWT');
// const authUser = require('../middleweres/authUser');

const { create, getAll, getById } = require('../controllers/recipes');

router.route('/')
  .get(getAll)
  .post(authJWT, create);

router.route('/:id')
  .get(getById);
  // .delete(authJWT, authUser, remove);

module.exports = router;
