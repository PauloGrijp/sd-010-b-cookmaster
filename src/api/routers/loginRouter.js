const express = require('express');

const loginController = require('../../controllers/loginController');
const { checkValues, checkEmail } = require('../../middlewares/loginMiddlewares');

const router = express.Router();

router.post('/', checkValues, checkEmail, loginController.userLogin);

module.exports = router;
