const express = require('express');
const users = require('./UsersRouter');
const login = require('./LoginRouter');

const router = express.Router();

router.use('/users', users);
router.use('/login', login);

module.exports = router;