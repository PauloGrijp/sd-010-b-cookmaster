const express = require('express');
const { login } = require('../controllers/loginController');
const { validateCredentials, validateUserInDB } = require('../middleware/validateUser');

const router = express.Router();

router.route('/').post(validateCredentials, validateUserInDB, login);

module.exports = router;