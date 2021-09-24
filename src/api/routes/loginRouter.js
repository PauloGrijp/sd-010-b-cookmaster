const express = require('express');
const login = require('../service/loginService');
const checkLoginInput = require('../middleware/checkLoginInput');

const router = express.Router();

router.post('/', checkLoginInput, login);

module.exports = router;