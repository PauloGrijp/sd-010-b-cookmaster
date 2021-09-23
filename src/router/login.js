const express = require('express');
const { 
  contLogin,
 } = require('../controller/usersController');

const router = express.Router();

router.post('/', contLogin);

module.exports = router;