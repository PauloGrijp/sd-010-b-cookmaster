const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// LOGIN
router.post('/', userController.validateEmailPassword, userController.getUser);

module.exports = router;