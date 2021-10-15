const { createNewRecipe, allRecipes, findRecipe } = require('../services/recipeServices');
const { validString } = require('../services/userServices');

const newRecipe = async (req, res) => {
  const { user: { _id }, body: { name, ingredients, preparation } } = req;
  if (!validString(name) || !validString(ingredients) || !validString(preparation)) {
    return res
      .status(400).json({ message: 'Invalid entries. Try again.' }); 
  }

  const recipe = await createNewRecipe(_id, name, ingredients, preparation);

  return res.status(201).send(recipe);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await allRecipes();

  return res.status(200).send(recipes);
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await findRecipe(id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).send(recipe);
};

module.exports = {
  newRecipe,
  getAllRecipes,
  getRecipe,
};
