const express = require('express');

const router = express.Router();

const authJWT = require('../middleweres/validateJWT');
const { create, getAll } = require('../controllers/recipes');

router.route('/')
  .get(getAll)
  .post(authJWT, create);

module.exports = router;
