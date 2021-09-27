const { getRecipesService,
  postRecipeService,
  getRecipeByIdService,
  putRecipeByIdService,
  deleteRecipeByIdService } = require('../services');

const postRecipeController = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.payload;
  
  const recipeCreated = await postRecipeService(name, ingredients, preparation, _id);
  
  if (recipeCreated.err) return next(recipeCreated.err);

  const id = '_id';
  
  const resObject = {
    recipe: {
      name: recipeCreated.ops[0].name,
      ingredients: recipeCreated.ops[0].ingredients,
      preparation: recipeCreated.ops[0].preparation,
      userId: recipeCreated.ops[0].userId,
      _id: recipeCreated.ops[0][id],
    },
  };

  res.status(201).json(resObject);
};

const getRecipesController = async (req, res, _next) => {
  const allRecipes = await getRecipesService();
  res.status(200).json(allRecipes);
};

const getRecipeByIdController = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await getRecipeByIdService(id);

  if (recipe.err) return next(recipe.err);

  res.status(200).json(recipe);
};

const putRecipeByIdController = async (req, res, next) => {
  const { _id, role } = req.payload;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  if (!_id) return next({ status: 401, message: 'missing auth token' });

  const recipe = await getRecipeByIdService(id);

  if (recipe.userId === _id || role === 'admin') {
    const recipeChanged = await putRecipeByIdService(id, name, ingredients, preparation, _id);
    recipeChanged.userId = _id;
    return res.status(200).json(recipeChanged);
  }
};

const deleteRecipeByIdController = async (req, res, _next) => {
  const { id } = req.params;
  const { _id, role } = req.payload;
  const recipe = await getRecipeByIdService(id);

  if (recipe.userId === _id || role === 'admin') {
    await deleteRecipeByIdService(id);
    res.status(204).json();
  }
};

module.exports = {
  getRecipesController,
  postRecipeController,
  getRecipeByIdController,
  putRecipeByIdController,
  deleteRecipeByIdController };
