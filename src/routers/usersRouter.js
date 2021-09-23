const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.doubleEmail, controllers.postUsers);

module.exports = router;
