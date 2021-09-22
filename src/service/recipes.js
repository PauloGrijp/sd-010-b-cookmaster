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

const updateRecipe = async (id, recipe, role) => {
    const recipeItem = await findRecipe(id);
    if (recipeItem.userId !== recipe.userId && role !== 'admin') {
        return {
            message: 'jwt malformed',
        };
       } 

        const response = await recipes.updateRecipe(id, recipe);
        return response;
};

const deleteRecipe = async (id, userId, role) => {
    const recipeItem = await findRecipe(id);
    // console.log('delete recipe service', id, userId, role, recipeItem);

    if (recipeItem.userId !== userId && role !== 'admin') {
        return {
            message: 'jwt malformed',
        };
       } 
        await recipes.deleteRecipe(id);
       return 'ok';
};

const insertImage = async (id, userId, role, url) => {
    const recipeItem = await findRecipe(id);
    console.log('insertImage  service', id, userId, role, recipeItem);

    if (recipeItem.userId !== userId && role !== 'admin') {
        return {
            message: 'jwt malformed',
        };
       } 
       const response = await recipes.insertImage(recipeItem, url);
       return response;
};

module.exports = { createRecipes, getAll, findRecipe, updateRecipe, deleteRecipe, insertImage };