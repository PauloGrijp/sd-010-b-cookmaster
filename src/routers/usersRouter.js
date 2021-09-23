const express = require('express');

const router = express.Router();

const { createUser } = require('../controllers/userController');
const { checkEmail, checkName, checkPasword } = require('../middlewares/userMiddlewares');

router.post('/users', checkName, checkEmail, checkPasword, createUser);

module.exports = router;