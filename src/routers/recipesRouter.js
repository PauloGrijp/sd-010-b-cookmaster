const express = require('express');

const router = express.Router();

const recipesController = require('../controllers/recipesControllers');

const { 
    recipeFields,
    validateToken,
    validateId,
    validateAdminToken,
    validateTokenForDelete,
    
  } = require('../services/recipesService');

router.post('/', recipeFields, validateToken, recipesController.recipeRegistration); 
router.get('/', recipesController.findAllRecipes); 
router.get('/:id', validateId, recipesController.findRecipeById); 
router.put('/:id', validateAdminToken, recipesController.updateByid); 
router.delete('/:id', validateTokenForDelete, recipesController.deleteByid); 
// app.use((err, req, res, _next) => 
// res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`));

module.exports = router;