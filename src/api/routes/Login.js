const express = require('express');

const router = express.Router();
const { checkLogin } = require('../controllers/Login');

router.route('/')
  .post(checkLogin);

module.exports = router;