const express = require('express');
const { validateJWT } = require('../middlewares/loginMiddlewares');
const {
  validateNameRecipes,
  validateIngredientsRecipes,
  validatePreparationRecipes } = require('../middlewares/recipesMiddlewares');
const { postRecipeService } = require('../service/recipesService');

const recipesRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 3: CONTROLLER responsável por receber a requisição de cadastro de receitas, chamar SERVICE e retornar a receita cadastrada.

recipesRouter.post('/',
  validateNameRecipes,
  validateIngredientsRecipes,
  validatePreparationRecipes,
  validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const newRecipe = await postRecipeService({ name, ingredients, preparation, userId: _id });

  return res.status(201).json({ recipe: newRecipe });
});

// ---------------------------------------------------------------

module.exports = { recipesRouter };
