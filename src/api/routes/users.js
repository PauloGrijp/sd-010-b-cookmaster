const express = require('express');
const middleware = require('../middlewares');

const router = express.Router();
const { create } = require('../controlers/users');

router.route('/')
    .post(
        middleware.verifyEntries,
        middleware.verifyEmail,
        create,
    );

module.exports = router;