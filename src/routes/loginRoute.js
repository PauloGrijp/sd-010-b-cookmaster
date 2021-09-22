const express = require('express');
const {
  validateUserLogin,
  checkUserExists,
} = require('../controllers/userController');

const generateToken = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', generateToken, validateUserLogin, checkUserExists);

module.exports = router;
