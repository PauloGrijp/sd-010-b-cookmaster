const recipes = require('../models/recipes');

const createRecipes = (recipe) => recipes.createRecipes(recipe);

const getAll = () => recipes.getAll();

const findRecipe = async (id) => {
    const recipe = await recipes.findRecipe(id);

    if (!recipe) {
        return {
            message: 'recipe not found',
        };
      }
      return recipe;
};

// canEdit =  

const updateRecipe = async (id, recipe, role) => {
    const recipeItem = await findRecipe(id);
    console.log('service', recipeItem, recipeItem.role !== 'admin');
    if (recipeItem.userId !== recipe.userId && role !== 'admin') {
        return {
            message: 'jwt malformed',
        };
       } 

        const response = await recipes.updateRecipe(id, recipe);
        return response;
};

module.exports = { createRecipes, getAll, findRecipe, updateRecipe };