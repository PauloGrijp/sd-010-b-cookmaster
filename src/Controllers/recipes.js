const {
  addRecipe,
  allRecipes,
  recipeBy,
  updateRecipe,
  deleteRecipe,
  uploadImage,
} = require('../services/recipes');

const requestNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user: { userId } } = req;

  const recipe = await addRecipe(name, ingredients, preparation, userId);

  return res.status(201).json(recipe);
};

const requestEditRecipe = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { user } = req;

  const editedRecipe = await updateRecipe(id, body, user);

  if (!editedRecipe) {
    return null;
  }

  return res.status(200).json(editedRecipe);
};

const requestUploadImage = async (req, res) => {
  const { id } = req.params;
  const { file } = req;

  const imageSaved = await uploadImage(id, file);

  console.log(imageSaved);

  return res.status(200).json(imageSaved);
};

const requestDeleteRecipe = async (req, res) => {
  const { id } = req.params;

  const recipeDeleted = await deleteRecipe(id);
  
  return res.status(204).json(recipeDeleted);
};

const requestListRecipes = async (_req, res) => {
  const recipesList = await allRecipes();

  return res.status(200).json(recipesList);
};

const requestRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipeById = await recipeBy(id);

  if (!recipeById) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipeById);
};

module.exports = {
  requestNewRecipe,
  requestListRecipes,
  requestRecipeById,
  requestEditRecipe,
  requestDeleteRecipe,
  requestUploadImage,
};
