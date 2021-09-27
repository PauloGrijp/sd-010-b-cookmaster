const express = require('express');

const router = express.Router();

const { create } = require('../controllers/recipes');

router.route('/')
  .post(create);

module.exports = router;