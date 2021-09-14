const modelsRecipes = require('../models/recipes');

const createRecipe = async (recipe) => {
    const { name, ingredients, preparation } = recipe;
    if ([name, ingredients, preparation].includes(undefined)) {
        return { errorType: 'bad_request - invalid entries',
        error: { message: 'Invalid entries. Try again.' } };
    }
    const result = await modelsRecipes.createRecipe(recipe);
    return result;
};

const getAllRecipes = async () => {
    const result = await modelsRecipes.getAllRecipes();
    return result;
};

const getRecipeById = async (id) => {
    const errorObject = { errorType: 'not_found', error: { message: 'recipe not found' } };
    
    if (id.length !== 24) {
        return errorObject;
    }
    const result = await modelsRecipes.getRecipeById(id);

    if (!result) {
        return errorObject;
    }
    return result;
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
};
