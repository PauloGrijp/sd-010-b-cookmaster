const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// ADD
router.post('/', 
userController.entryValidated, userController.emailValidated, userController.createUser);

module.exports = router;