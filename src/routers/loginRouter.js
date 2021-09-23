const express = require('express');

const router = express.Router();

const { login } = require('../controllers/loginController');
const { checkLogin, validEmailPassword } = require('../middlewares/loginMiddlewares');

router.post('/login', validEmailPassword, checkLogin, login);

module.exports = router;