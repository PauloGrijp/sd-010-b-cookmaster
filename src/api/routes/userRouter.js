const express = require('express');

const { createUser } = require('../controller/userController');
const { checkNewUserInfo, checkIfEmailExists } = require('../middleware/userMiddleware');

const router = express.Router();

router.post('/', checkNewUserInfo, checkIfEmailExists, createUser);

module.exports = router;