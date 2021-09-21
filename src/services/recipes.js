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

const editRecipe = async (payload, id) => {
    const result = await modelsRecipes.editRecipe(payload, id);
    return result;
};

const deleteRecipe = async (id) => {
    const result = await modelsRecipes.deleteRecipe(id);
    return result;
};

const addImageToRecipe = async (filename) => {
    const result = await modelsRecipes.addImageToRecipe(filename);
    
    const id = filename.slice(0, 24);
    if (result === 1) {
        const recipeWithImage = await getRecipeById(id);
        return recipeWithImage;
    }
    return { errorType: 'no change on database', error: { message: 'unable to update recipe' } };
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    editRecipe,
    deleteRecipe,
    addImageToRecipe,
};
