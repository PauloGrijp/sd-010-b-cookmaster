const { createRecipe, listRecipes } = require('../models/recipes_model');

const create = async (name, ingredients, preparation, userId) => {
    const newRecipe = await createRecipe(name, ingredients, preparation, userId);

    return newRecipe;
};

const getAll = async () => {
    const recipes = await listRecipes();
    return recipes;
};

module.exports = {
    create,
    getAll,
};