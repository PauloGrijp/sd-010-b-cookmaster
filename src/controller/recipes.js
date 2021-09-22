const recipes = require('../service/recipes');

const createRecipes = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;  
    console.log(authorization, 'authorization');

    const recipe = await recipes.createRecipes(name, ingredients, preparation, authorization);
    return res.status(201).json(recipe);
};

const getAll = async (req, res) => {
    const recipe = await recipes.getAll();
    return res.status(200).json(recipe);
};

module.exports = { createRecipes, getAll };