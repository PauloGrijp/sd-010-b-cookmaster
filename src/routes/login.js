const express = require('express');
const { authenticate } = require('../controllers/usersController');

const router = express.Router();

router.post('/', authenticate);

module.exports = router;
