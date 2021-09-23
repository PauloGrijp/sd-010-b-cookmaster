const { createRecipe } = require('../models/recipes_model');

const create = async (name, ingredients, preparation, userId) => {
    const newRecipe = await createRecipe(name, ingredients, preparation, userId);

    return newRecipe;
};

module.exports = {
    create,
};