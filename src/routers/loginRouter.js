const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/',
loginController.verifyEmailAndPassword,
loginController.validateEmail,
loginController.userLogin);

module.exports = router;
