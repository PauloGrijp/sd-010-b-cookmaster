const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

router.use('/users', usersController);

module.exports = router;