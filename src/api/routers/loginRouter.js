const express = require('express');

const loginController = require('../../controllers/loginController');
const { checkValues } = require('../../middlewares/loginMiddlewares');

const router = express.Router();

router.get('/', checkValues, loginController.userLogin);

module.exports = router;
