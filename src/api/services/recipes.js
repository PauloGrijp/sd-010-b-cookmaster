const { createOne } = require('../models/recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
    const created = await createOne(name, ingredients, preparation, userId);
    return created;
};

module.exports = { createRecipe };