const recipesModel = require('../models/recipes');

module.exports = async (_req, res) => {
  try {
    const recipes = await recipesModel.getAllRecipes();
      return res.status(200).json(recipes);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ops.. Something went wrong', error: err.message });
  }
};