const path = require('path');

const { newRecipe, getRecipe, getRecipeById, 
  editarRecipe, deletarRecipe, uploadImage } = require('../services/recipes.service');

const { memoryUpload } = require('../middlewares/upload');

const addRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  const result = await newRecipe(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: result });
};

const listRecipes = async (req, res) => {  
  const result = await getRecipe();
  return res.status(200).json(result);
};

const listById = async (req, res) => {  
  const { id } = req.params;
  const { result } = await getRecipeById(id);
  if (!result) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(result);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  const result = await editarRecipe(id, name, ingredients, preparation);
  return res.status(200).json({ ...result, userId });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await deletarRecipe(id);
  return res.status(204).json(result);
};

const uploadPicture = [
  memoryUpload.single('image'),
  async (req, res) => {
    const { id } = req.params;
    const result = await uploadImage(id, 
      path.join('localhost:3000', 'src', 'uploads', `${id}.jpeg`));
    res.status(200).json(result);
  },
];

module.exports = { addRecipes,
listRecipes,
listById,
editRecipe,
deleteRecipe,
uploadPicture };