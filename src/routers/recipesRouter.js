const express = require('express');

const router = express.Router();

const recipesController = require('../controllers/recipesControllers');

const { 
    recipeFields,
    validateToken,

  } = require('../services/recipesService');

router.post('/', recipeFields, validateToken, recipesController.recipeRegistration); 

// app.use((err, req, res, _next) => 
// res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`));

module.exports = router;