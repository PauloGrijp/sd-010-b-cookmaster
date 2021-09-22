const express = require('express');
const { emailValidations, emailValidate } = require('../../middlewares/loginValidations');
const loginController = require('../../controller/loginController');

const router = express.Router();

router.post('/', emailValidations, emailValidate, loginController.login);

module.exports = router;