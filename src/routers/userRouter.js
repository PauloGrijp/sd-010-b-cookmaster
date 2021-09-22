const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// ADD
router.post('/', 
userController.entryValidated, userController.emailValidated, userController.createUser);

// LOGIN
router.post('/', userController.validateEmailPassword, userController.getUser);

module.exports = router;