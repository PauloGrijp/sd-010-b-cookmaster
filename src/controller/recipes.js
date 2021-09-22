const recipes = require('../service/recipes');

const createRecipes = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;  
    console.log(authorization, 'authorization');

    const recipe = await recipes.createRecipes(name, ingredients, preparation, authorization);
    return res.status(201).json(recipe);
};
module.exports = { createRecipes };