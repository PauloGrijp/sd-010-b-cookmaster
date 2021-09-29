const rescue = require('express-rescue');
const Recipe = require('../services/serviceRecipes');
// const validateJWT = require('../schema/validateJWT');

const createRecipe = rescue(async (req, res, _next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    // Olhei a forma de usar o req.user da colega Mariana Savoldi
    const { _id } = req.user;
    // console.log(_id);
    const newRecipe = await Recipe.createRecipe(name, ingredients, preparation, _id);
    // console.log(newRecipe);
    if (!newRecipe) return res.status(401).json({ message: 'jwt malformed' });

    if (typeof newRecipe.message === 'string') return res.status(400).json(newRecipe);

    newRecipe.userId = _id;
    return res.status(201).json({ recipe: newRecipe });
  } catch (err) {
    console.error(err);
  }
});

const getAll = rescue(async (_req, res, _next) => {
  const getAllRecipes = await Recipe.getAll();

  return res.status(200).json(getAllRecipes);
});

const getRecipeById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  // console.log(id);
  const recipeById = await Recipe.getRecipeById(id);

  if (typeof recipeById.message === 'string') return res.status(404).json(recipeById);

  return res.status(200).json(recipeById);
});

const updateRecipe = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const newUpdatedRecipe = { name, ingredients, preparation };
  const updatedRecipe = await Recipe.updateRecipe(id, newUpdatedRecipe, _id);

  return res.status(200).json(updatedRecipe);
});

module.exports = {
  createRecipe,
  getAll,
  getRecipeById,
  updateRecipe,
};