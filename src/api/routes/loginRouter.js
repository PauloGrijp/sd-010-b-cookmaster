const express = require('express');

const router = express.Router();

const {
  validateFields,
  validateEmail,
  login,
} = require('../../controllers/loginController');

router.post('/',
  validateFields,
  validateEmail,
  login);

module.exports = router;