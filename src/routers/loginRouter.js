const express = require('express');

const router = express.Router();

const { login } = require('../controllers/loginController');
const { checkLogin } = require('../middlewares/loginMiddlewares');

router.post('/login', checkLogin, login);

module.exports = router;