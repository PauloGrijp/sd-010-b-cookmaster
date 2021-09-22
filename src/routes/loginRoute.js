const express = require('express');
const {
  validateUserLogin,
  checkUserExists,
  userLogin,
} = require('../controllers/userController');

const generateToken = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', validateUserLogin, checkUserExists, generateToken, userLogin);

module.exports = router;
