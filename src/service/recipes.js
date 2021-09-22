const recipes = require('../models/recipes');

const createRecipes = (name, ingredients, preparation, authorization) => {
    const recipe = {
        name, ingredients, preparation, authorization,
    };
    return recipes.createRecipes(recipe);
};

const getAll = () => recipes.getAll();

module.exports = { createRecipes, getAll };