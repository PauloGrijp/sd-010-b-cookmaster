const recipes = require('../service/recipes');
const { renderRecipesObject } = require('../helpers/renderRecipesObject');

const createRecipes = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;  

    const recipe = await recipes
    .createRecipes(renderRecipesObject(name, ingredients, preparation, userId));
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
const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { userId, role } = req.user;  
    
    const recipe = await recipes
    .updateRecipe(id, renderRecipesObject(name, ingredients, preparation, userId), role);

    if (recipe.message) return res.status(200).json(recipe);
    console.log('recipe on controller', recipe, req.user);
    return res.status(200).json(recipe.recipe);
};

module.exports = { createRecipes, getAll, findRecipe, updateRecipe };