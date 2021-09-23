const express = require('express');
const { 
  contUserReg,
 } = require('../controller/usersController');

const router = express.Router();

router.post('/', contUserReg);

module.exports = router;