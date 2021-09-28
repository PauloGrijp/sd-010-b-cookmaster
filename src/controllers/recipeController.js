const recipeService = require('../services/recipeService');

const CREATED = 201;
const BAD_REQUEST = 400;

// req 3
const registerRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const { message, id } = await recipeService.createRecipe({ 
    name, ingredients, preparation,
  });

  if (message) {
    return res.status(BAD_REQUEST).json({ message });
  }

  return res.status(CREATED).json(
    { recipe: { name, ingredients, preparation, userId, _id: id } },
    );
};

module.exports = {
  registerRecipe,
};
