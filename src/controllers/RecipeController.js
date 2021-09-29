const Joi = require('joi');
const RecipeService = require('../services/RecipeService');

const OK_200 = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const INVALID_ENTRIES = { message: 'Invalid entries. Try again.' };

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id: userId } = req.user;

  const { error } = Joi.object({
    name: Joi.string().required().not().empty(),
    ingredients: Joi.string().required().not().empty(),
    preparation: Joi.string().required().not().empty(),
  }).validate(req.body);
  if (error) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);

  const response = await RecipeService.createRecipe({
    name,
    ingredients,
    preparation,
    userId,
  });

  return res.status(CREATED).json(response);
};

const getAllRecipes = async (req, res) => {
  const response = await RecipeService.getAllRecipes();
  return res.status(OK_200).json(response);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
