const { createNewRecipe, allRecipes, findRecipe } = require('../services/recipeServices');

const newRecipe = async (req, res) => {
  const { user: { _id }, body: { name, ingredients, preparation } } = req;
  if (!name || !ingredients || !preparation) {
    return res
      .status(400).json({ message: 'Invalid entrie. Try again.' }); 
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

  return res.status(200).send(recipe);
};

module.exports = {
  newRecipe,
  getAllRecipes,
  getRecipe,
};
