const { addRecipe } = require('../services/recipes');

const requestNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const recipe = await addRecipe(name, ingredients, preparation);

  return res.status(200).json(recipe);
};

module.exports = {
  requestNewRecipe,
};
