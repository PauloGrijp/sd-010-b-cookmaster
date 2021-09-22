const express = require('express');

const router = express.Router();

const {
  validateFields,
  validateEmail,
  createUser,
} = require('../../controllers/usersController');

router.post('/',
  validateFields,
  validateEmail,
  createUser);

module.exports = router;