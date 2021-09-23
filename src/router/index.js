const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/users', middlewares.doubleEmail, controllers.postUsers);

router.post('/login', controllers.checkEmailPassword);

module.exports = router;
