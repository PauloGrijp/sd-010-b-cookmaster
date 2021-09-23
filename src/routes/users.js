const express = require('express');
const { create } = require('../controllers/usersController');

const router = express.Router();

router.post('/', create);

module.exports = router;
