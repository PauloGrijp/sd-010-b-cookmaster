const recipesModel = require('../model/recipesModel');

const createRecipe = async (req, res) => {
  const message = 'Invalid entries. Try again.';
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  console.log(req.user);
  if (!name || !ingredients || !preparation) return res.status(400).json({ message });

  const recipe = await recipesModel.addRecipe(name, ingredients, preparation, _id);
  return res.status(201).json({ recipe });
};

module.exports = {
  createRecipe,
};