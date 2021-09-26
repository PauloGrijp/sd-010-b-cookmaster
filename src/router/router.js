const express = require('express');
const usersController = require('../controller/usersController');
const loginController = require('../controller/loginController');

const router = express.Router();

router.use('/users', usersController);
router.use('/login', loginController);

module.exports = router;