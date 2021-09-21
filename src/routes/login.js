const express = require('express');
const rescue = require('express-rescue');
const { authenticate } = require('../controllers/usersController');

const router = express.Router();

router.post('/', rescue(authenticate));

module.exports = router;
