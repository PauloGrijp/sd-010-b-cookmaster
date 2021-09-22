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
};