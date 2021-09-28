const { createOne, getAll, getRecipeID, editOne } = require('../models/recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
    const created = await createOne(name, ingredients, preparation, userId);
    return created;
};

const getAllRecipes = async () => {
    const allRecipes = await getAll();
    return allRecipes;
};

const getRecipe = async (id) => {
    const recipe = await getRecipeID(id);
    return recipe;
};

const editRecipe = async (id, name, ingredients, preparation) => {
    const recipe = await editOne(id, name, ingredients, preparation);
    return recipe;
};

module.exports = { createRecipe, getAllRecipes, getRecipe, editRecipe };