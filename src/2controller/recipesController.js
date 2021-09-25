const {
  createRecipeService,
  getRecipesService,
  getRecipesIDService } = require('../3services/recipesService');

const STATUS = {
  create: 201,
  get: 200,
  err: 404,
};

const createRecipes = async (req, res) => {
  const answer = await createRecipeService(req.body, req.headers.authorization);

  const { status, message } = answer;
  if (status) {
    return res.status(status).json({ message });
  }
  return res.status(STATUS.create).json(answer);
};

const getRecipes = async (req, res) => {
  const answer = await getRecipesService();
  return res.status(STATUS.get).json(answer);
};

const getRecipesID = async (req, res) => {
  const answer = await getRecipesIDService(req);
  if (!answer) { return res.status(STATUS.err).json({ message: 'recipe not found' }); }
  console.log(answer, 'seilah');
  return res.status(STATUS.get).json(answer);
};

module.exports = {
  createRecipes,
  getRecipes,
  getRecipesID,
};