const express = require('express');
const { validateJWT } = require('../middlewares/loginMiddlewares');
const {
  validateNameRecipes,
  validateIngredientsRecipes,
  validatePreparationRecipes } = require('../middlewares/recipesMiddlewares');
const {
  postRecipeService,
  getRecipesService, 
  getRecipeByIdService } = require('../service/recipesService');

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
// Requisito 5: CONTROLLER responsável por receber a requisição de listagem de receita por ID, chamar SERVICE e retornar a receita cadastrada.

recipesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeByIdService(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
});

// ---------------------------------------------------------------

module.exports = { recipesRouter };
