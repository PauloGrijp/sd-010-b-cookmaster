// const { ObjectId } = require('mongodb');
const service = require('../services/recipeService');
const messages = require('../helpers/validationMessages');

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await service.getAllRecipes();

    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await service.getRecipeById(id);

    if (recipe === null) return res.status(404).json(messages.RECIPE_NOT_FOUND);

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(404).json(messages.RECIPE_NOT_FOUND);
  }
};

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const id = _id.toString();
    const result = await service.createRecipe({ name, ingredients, preparation, userId: id });

    if (result === false) return res.status(400).json(messages.INVALID_ENTRY);

    return res.status(201).json({ recipe: {
      name,
      ingredients,
      preparation,
      userId: id,
      _id: result.insertedId,
    } });
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};