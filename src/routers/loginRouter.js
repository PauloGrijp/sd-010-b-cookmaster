const express = require('express');
const controller = require('../controllers/loginController');
const { authLogin } = require('../middlewares');

const router = express.Router();

router.use(authLogin.validateLogin);

router.post('/', controller.getUser);

module.exports = router;
