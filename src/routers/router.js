const express = require('express');
const path = require('path');
const {
  usersController,
  loginController,
  recipesController,
} = require('../controllers');
const error = require('../middlewares/error');

const router = express.Router();

router.use('/users', usersController);
router.use('/login', loginController);
router.use('/recipes', recipesController);
router.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
router.use(error);

module.exports = router;
