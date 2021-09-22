const RecipesModel = require('../models/Recipes');
const RecipeSchemas = require('../schemas/Recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const isValid = RecipeSchemas.recipeValidator(name, ingredients, preparation);
  if (isValid.result) return isValid;

  const created = await RecipesModel.createRecipe(
    name,
    ingredients,
    preparation,
    userId
  );
  return created;
};

const getAllRecipes = async () => RecipesModel.getAllRecipes();

module.exports = { createRecipe, getAllRecipes };
