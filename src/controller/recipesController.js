const express = require('express');
const { validateJWT } = require('../middlewares/loginMiddlewares');
const {
  validateNameRecipes,
  validateIngredientsRecipes,
  validatePreparationRecipes } = require('../middlewares/recipesMiddlewares');
const {
  postRecipeService,
  getRecipesService } = require('../service/recipesService');

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
// Requisito 4: CONTROLLER responsável por receber a requisição de listagem de receitas cadastradas, chamar SERVICE e retornar as receitas cadastradas.

recipesRouter.get('/', async (req, res) => {
  const recipes = await getRecipesService();

  return res.status(200).json(recipes);
});

// ---------------------------------------------------------------

module.exports = { recipesRouter };
