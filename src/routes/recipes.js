const express = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../auth/validateJWT');
const { create, getAll, getById, update, deleteById } = require('../controllers/recipesController');

const router = express.Router();

router.route('/:id')
  .get(rescue(getById))
  .put(rescue(validateJWT), rescue(update))
  .delete(rescue(validateJWT), rescue(deleteById));

router.route('/')
  .post(rescue(validateJWT), rescue(create))
  .get(rescue(getAll));

module.exports = router;
