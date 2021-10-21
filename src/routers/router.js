const express = require('express');
const usersRouter = require('../controllers/userController');
const recipesRouter = require('../controllers/recipesController');
const loginRouter = require('../controllers/loginController');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/recipes', recipesRouter);

module.exports = router;
