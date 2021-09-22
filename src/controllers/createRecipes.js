const recipesModel = require('../models/recipes');

module.exports = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipesModel.registerRecipe(name, ingredients, preparation);
    console.log(recipe);
      return res.status(201).json(recipe);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ops.. Something went wrong', error: err.message });
  }
};