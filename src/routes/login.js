const express = require('express');

const router = express.Router();
const { checkLogin } = require('../controller/login');

router.route('/')
  .post(checkLogin);

module.exports = router;