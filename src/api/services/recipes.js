const { createOne, getAll, getRecipeID } = require('../models/recipes');

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

module.exports = { createRecipe, getAllRecipes, getRecipe };