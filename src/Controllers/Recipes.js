const service = require('../Services/Recipes');

const newRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const result = await service.newRecipe(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: result });
};

module.exports = {
  newRecipe,
};
