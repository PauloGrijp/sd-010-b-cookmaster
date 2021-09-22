const recipes = require('../models/recipes');

const createRecipes = (name, ingredients, preparation, authorization) => {
    const recipe = {
        name, ingredients, preparation, authorization,
    };
    return recipes.createRecipes(recipe);
};

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

module.exports = { createRecipes, getAll, findRecipe };