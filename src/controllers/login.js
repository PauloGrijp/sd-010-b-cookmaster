const express = require('express');
const { jwtSetup, jwtCheckEmailPassword } = require('../services/jwtServices');

const router = express.Router();

router.post('/',
jwtCheckEmailPassword,
jwtSetup);

module.exports = router;