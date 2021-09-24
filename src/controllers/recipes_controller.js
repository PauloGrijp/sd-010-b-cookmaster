const { create, getAll, getById, update, remove } = require('../services/recipe_service');

const createRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;

    const newRecipe = await create(name, ingredients, preparation, userId);
    
    return res.status(201).json({ recipe: newRecipe });
};

const getAllRecipes = async (req, res) => {
    const recipes = await getAll();
    return res.status(200).json(recipes);
};

const recipeById = async (req, res) => {
    const { id } = req.params;
    console.log(id, 'controller');

    const recipe = await getById(id);

    if (recipe.error) {
        return res.status(404).json({ message: 'recipe not found' });
    }

    return res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
    /* const { id } = req.params;
    const { body } = req; */

    const recipe = await update(req);
    
    return res.status(200).json(recipe);
};

const removeRecipe = async (req, res) => {
    const { id } = req.params;

    const recipe = await remove(id);
    console.log(recipe, 'controller');

    return res.status(204).json(recipe);
};

module.exports = {
    createRecipe,
    getAllRecipes,
    recipeById,
    updateRecipe,
    removeRecipe,
};