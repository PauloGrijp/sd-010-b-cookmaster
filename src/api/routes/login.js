const express = require('express');
const middleware = require('../middlewares');

const router = express.Router();
const { login } = require('../controlers/login');

router.route('/')
    .post(
        middleware.verifyLoginEntries,
        middleware.validateLogin,
        login,
    );

module.exports = router;