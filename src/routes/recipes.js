const express = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../auth/validateJWT');
const { create } = require('../controllers/recipesController');

const router = express.Router();

router.route('/')
  .post(rescue(validateJWT), rescue(create));

module.exports = router;
