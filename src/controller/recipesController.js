const express = require('express');
const { postRecipeService } = require('../service/recipesService');

const recipesRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 3: CONTROLLER responsável por receber a requisição de cadastro de receitas, chamar SERVICE e retornar a receita cadastrada.

recipesRouter.post('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await postRecipeService({ name, ingredients, preparation });

  return res.status(201).json({ recipe: newRecipe });
});

// ---------------------------------------------------------------

module.exports = { recipesRouter };
