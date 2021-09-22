const path = require('path');
const recipesService = require('../services/recipesService');

const { upload } = require('../middlewares/upload');

const verifyRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) { 
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
  }
  next();
};

const createRecipe = async (req, res) => {
  const id = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipeCreated = await recipesService.createRecipe({
     userId: id, name, ingredients, preparation, 
    });
  return res.status(201).json({ recipe: recipeCreated });
};

const getAll = async (_req, res) => {
const allRecipes = await recipesService.getAll();
return res.status(200).json(allRecipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  if (!recipe) { return res.status(404).json({ message: 'recipe not found' }); }
  return res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const id = req.user;
  const { role } = req;
  const { name, ingredients, preparation } = req.body;
  const recipe = await recipesService
  .updateRecipe({ recipeId, name, ingredients, preparation, id, role });
  if (!recipe) { return res.status(401).json({ message: 'Recipe owner incorrect' }); }
  return res.status(200).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const id = req.user;
  const { role } = req;
  const recipe = await recipesService.deleteRecipe({ recipeId, id, role });
  if (recipe) { return res.status(204).end(); }
};

const uploadImage = [
  upload.single('image'),
  async (req, res) => {
    const { recipeId } = req.params;
    const id = req.user;
    const { role } = req;
    const result = await recipesService.uploadImage({ 
      recipeId, id, role, 
    }, path.join('localhost:3000', 'src', 'uploads', `${recipeId}.jpeg`));
    return res.status(200).json(result);
  },
];

module.exports = {
  verifyRecipe,
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};