const recipes = require('../service/recipes');

const createRecipes = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;  

    const recipe = await recipes.createRecipes(name, ingredients, preparation, authorization);
    return res.status(201).json(recipe);
};

const getAll = async (req, res) => {
    const recipe = await recipes.getAll();
    return res.status(200).json(recipe);
};

const findRecipe = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipes.findRecipe(id);
    if (recipe.message) return res.status(404).json(recipe);
    return res.status(200).json(recipe);
};

module.exports = { createRecipes, getAll, findRecipe };