// const recipesModel = require('../models/recipes');

module.exports = async (req, res, _next) => {
  const { id } = req.params;
  const { user } = req.body;
  const { _id: userId } = user;

  // const recipe = await recipesModel.getRecipeById(id);

  console.log('uploads', id);
  console.log('uploads', userId);

  return res.status(200).json();
};
