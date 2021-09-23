const recipesModel = require('../models/recipes');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  try {
    const recipe = await recipesModel.editRecipe({ id, name, ingredients, preparation, userId });
    return res.status(200).json(recipe); 
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ops.. Something went wrong', error: err.message });
  }
};