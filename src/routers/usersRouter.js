const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', 
userController.verifyName, 
userController.verifyEmail, 
userController.verifyPassword,
userController.createUser);

module.exports = router;