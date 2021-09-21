const { createRecipe,
  getAllRecipes,
} = require('../service/recipeService');
const catchAsync = require('../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  const body = { _id, name, ingredients, preparation };
  const recipe = await createRecipe(body);
  return res.status(201).json(recipe);
});

const getAll = async (req, res) => {
const allRecipes = await getAllRecipes();
return res.status(200).json(allRecipes);
};

module.exports = {
  create,
  getAll,

};