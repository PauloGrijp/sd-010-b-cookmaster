const express = require('express');
const rescue = require('express-rescue');
const createUser = require('../controllers/usersController');

const router = express.Router();

router.post('/', rescue(createUser));

module.exports = router;
