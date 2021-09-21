const express = require('express');

const controllersLogin = require('../../controllers/login');
const middlewares = require('../../middlewares/index');

const router = express.Router();

router.post('/', middlewares.jsonWebToken, controllersLogin.makeLogin);

module.exports = router;
