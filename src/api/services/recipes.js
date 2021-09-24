const { createOne, getAll } = require('../models/recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
    const created = await createOne(name, ingredients, preparation, userId);
    return created;
};

const getAllRecipes = async () => {
    const allRecipes = await getAll();
    return allRecipes;
};

module.exports = { createRecipe, getAllRecipes };