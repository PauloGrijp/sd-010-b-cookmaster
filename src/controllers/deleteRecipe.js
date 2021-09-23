const recipesModel = require('../models/recipes');

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await recipesModel.deleteRecipe(id);
    return res.status(204).json(recipe); 
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ops.. Something went wrong', error: err.message });
  }
};