const express = require('express');
const recipeController = require('../controllers/recipeController');
const validateToken = require('../controllers/validateToken');

const router = express.Router();

// ADD
router.get('/', 
 recipeController.getAllRecipe);

// ADD
router.post('/', 
 recipeController.validateEntries, validateToken.validate, recipeController.createRecipe);
 
module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiaWF0IjoxNjMyMzQxOTk5LCJleHAiOjE2MzI0MjgzOTl9.jc8-7AjMOUcUf4bYiDObR4iLKWhe1NErJqnWRidQ4z4