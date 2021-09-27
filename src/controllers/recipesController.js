const recipesServices = require('../services/recipesServices');

const createRecipe = async (req, res) => {
  const recipe = req.body;
  const { user: { _id } } = req;

  recipe.userId = _id;

  const createdRecipe = recipesServices.createRecipe(recipe);

  if (createdRecipe.error) {
    const { error: { status, message } } = createdRecipe;
    return res.status(status).json({ message });
  }

  res.status(201).json({ ...createdRecipe });
};

module.exports = {
  createRecipe,
};