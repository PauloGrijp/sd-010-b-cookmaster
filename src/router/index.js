const express = require('express');
const user = require('./UsersRouter');
const recipe = require('./RecipesRouter');
const login = require('./LoginRouter');

const router = express.Router();

router.use('/users', user);
router.use('/recipes', recipe);
router.use('/login', login);

module.exports = router;
