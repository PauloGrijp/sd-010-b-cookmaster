const express = require('express');
const { emailValidations } = require('../../middlewares/userValidations');
const usersController = require('../../controller/usersController');

const router = express.Router();

router.post('/', emailValidations, usersController.add);

module.exports = router;