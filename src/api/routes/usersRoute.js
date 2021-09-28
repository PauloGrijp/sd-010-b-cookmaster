const express = require('express');
const rescue = require('express-rescue');

const controller = require('../controllers/userController');

const router = express.Router();

router.post('/', rescue(controller.create));

module.exports = router;