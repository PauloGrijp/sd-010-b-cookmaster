const express = require('express');

const router = express.Router();

const { verifyEntries, verifyEmail, create } = require('../controlers/users');

router.route('/')
    .post(
        verifyEntries,
        verifyEmail,
        create,
    );

module.exports = router;