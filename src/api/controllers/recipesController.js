const { createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe, removeRecipe, addRecipeFile } = require('../service/recipeService');
const catchAsync = require('../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  const body = { _id, name, ingredients, preparation };
  const recipe = await createRecipe(body);
  return res.status(201).json(recipe);
});

const getAll = async (req, res) => {
const allRecipes = await getAllRecipes();
return res.status(200).json(allRecipes);
};

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await getRecipeById(id);
  return res.status(200).json(response);
});

const update = catchAsync(async (req, res) => {
  const { _id: idUser, role } = req.user;
  const { id: idRecipe } = req.params;
  const recipe = await updateRecipe(req.body, idUser, idRecipe, role);
  return res.status(200).json(recipe);
});

const remove = catchAsync(async (req, res) => {
  const { _id: idUser, role } = req.user;
  const { id: idRecipe } = req.params;
  const recipe = await removeRecipe(idUser, idRecipe, role);
  if (recipe) return res.status(204).json(null);
});

const addFile = catchAsync(async (req, res) => {
  const { _id: idUser, role } = req.user;
  const { id: idRecipe } = req.params;
  const recipe = await addRecipeFile(idUser, idRecipe, role);
  if (recipe) return res.status(200).json(recipe);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  addFile,
};