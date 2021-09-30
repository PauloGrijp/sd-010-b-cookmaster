const { 
  createNewRicipe,
  getAllRicipes, 
  getOne, 
  updateRecipeId, 
  deleteOne } = require('../model/recipes');
const { localRecipeImage } = require('../service/recipes');

let err;
const successOk = 200;
const success = 201;
const erroCredential = 400;
const errorNotFound = 404;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  if (!name || !ingredients || !preparation) {
    err = { message: 'Invalid entries. Try again.' };
    return res.status(erroCredential).json(err);
  }
  const createdRecipe = await createNewRicipe(name, ingredients, preparation, _id);
  return res.status(success).json(createdRecipe);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await getAllRicipes();
  return res.status(successOk).json(recipes);
};

const getRecipeId = async (req, res) => {
  try {
    const { id } = req.params;
    err = { message: 'recipe not found' };
    const recipe = await getOne(id);
    if (recipe === null) {
      return res.status(errorNotFound).json(err);
    }
    return res.status(successOk).json(recipe);
  } catch (error) {
    return res.status(errorNotFound).json(err);
  }
};

const updateRecipe = async (req, res) => {
  const recipeId = req.params.id;
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const user = _id;
  const updatedRecipe = await updateRecipeId({ recipeId, name, ingredients, preparation, user });
  return res.status(successOk).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  await deleteOne(id);

  return res.status(204).send();
};

const uploadImage = (async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const recipeImage = `localhost:3000/${path}`;
  const addImage = await localRecipeImage(id, recipeImage);
  return res.status(successOk).json(addImage);
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeId,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};