const express = require('express');
const { validateJWT } = require('../middlewares/loginMiddlewares');
const {
  validateNameRecipes,
  validateIngredientsRecipes,
  validatePreparationRecipes, 
  validateIdRecipes } = require('../middlewares/recipesMiddlewares');
const {
  postRecipeService,
  getRecipesService, 
  getRecipeByIdService, 
  putRecipeByIdService, 
  delRecipeByIdService } = require('../service/recipesService');

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

recipesRouter.get('/:id', validateIdRecipes, async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeByIdService(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
});

// ---------------------------------------------------------------
// Requisito 7: CONTROLLER responsável por receber a atualização de receita por ID, chamar SERVICE e retornar a receita atualizada.

recipesRouter.put('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id, role } = req.user;

  const updatedRecipe = await putRecipeByIdService({
    recipeId: id,
    name,
    ingredients,
    preparation,
    reqUserId: _id,
    role,
  });

  if (!updatedRecipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(updatedRecipe);
});

// ---------------------------------------------------------------
// Requisito 8: CONTROLLER responsável por receber a requisição para deletar receita por ID, chamar SERVICE e retornar a receita deletada.

recipesRouter.delete('/:id', validateJWT, validateIdRecipes, async (req, res) => {
  const { id } = req.params;
  const { _id, role } = req.user;

  const deletedRecipe = await delRecipeByIdService({ recipeId: id, reqUserId: _id, role });

  if (!deletedRecipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(204).end();
});

// ---------------------------------------------------------------

module.exports = { recipesRouter };
