const model = require('../models/recipes');
const service = require('../services/recipes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const createdRecipe = await model.create(name, ingredients, preparation, _id);
  
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  return res.status(201).json(createdRecipe);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await model.getAll();

  return res.status(200).json(recipes);
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await service.readRecipe(id);

    if (exists === null) {
      return res.status(404).json({ message: 'recipe not found' });
    }

    const recipe = await model.getOne(id);

    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(404).json({ message: 'recipe not found' });
  }
};

const updateRecipe = async (req, res) => {
  const recipeId = req.params.id;
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const user = _id;
  const updatedRecipe = await model.update({ recipeId, name, ingredients, preparation, user });

  return res.status(200).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await model.deleteOne(id);
  return res.status(204).send();
};

const uploadImage = (async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const recipeImage = `localhost:3000/${path}`;

  const addImage = await service.recipeImage(id, recipeImage);

  return res.status(200).json(addImage);
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
