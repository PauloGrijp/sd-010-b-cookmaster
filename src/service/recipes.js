const recipes = require('../models/recipes');

const createRecipes = (name, ingredients, preparation, authorization) => {
    const recipe = {
        name, ingredients, preparation, authorization,
    };
    return recipes.createRecipes(recipe);
};

module.exports = { createRecipes };