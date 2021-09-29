const recipesValidations = require('../services/recipesValidations');

const createRecipesController = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipes = await recipesValidations.createRecipes({ name, ingredients, preparation });
  const { message, id } = recipes;
  if (message) {
    return res.status(400).json({ message });
  }
  return res.status(201).json({ recipe: { name, ingredients, preparation, userId, _id: id } });
};

const getAllRecipes = async (_req, res) => {
  const allRecipes = await recipesValidations.getAllRecipes();
  if (!allRecipes) {
    return res.status(404).json({ message: 'Recipes not found' });
  }
  return res.status(200).json(allRecipes);
};

 const getRecipeById = async (req, res) => {
   const { id } = req.params;
   const recipeById = await recipesValidations.getRecipeById(id);
   const { message } = recipeById;
   console.log(message);
   if (message) {
     return res.status(404).json({ message });
   }
   return res.status(200).json(recipeById);
 };

module.exports = {
  createRecipesController,
  getAllRecipes,
  getRecipeById,
};