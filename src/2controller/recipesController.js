const { createRecipeService } = require('../3services/recipesService');

const STATUS_OK = {
  create: 201,
};

const createRecipes = async (req, res) => {
  const answer = await createRecipeService(req.body, req.headers.authorization);

  const { status, message } = answer;
  if (status) {
    return res.status(status).json({ message });
  }
  return res.status(STATUS_OK.create).json(answer);
};

module.exports = {
  createRecipes,
};