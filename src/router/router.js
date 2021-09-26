const express = require('express');
const usersController = require('../controller/usersController');
const loginController = require('../controller/loginController');
const recipesController = require('../controller/recipesController');

const router = express.Router();

router.use('/users', usersController);
router.use('/login', loginController);
router.use('/recipes', recipesController);

module.exports = router;