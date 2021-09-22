const express = require('express');
const { 
  validateUserName,
  validateEmail,
  validatePassword,
  createUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', validateUserName, validateEmail, validatePassword, createUser);

module.exports = router;
