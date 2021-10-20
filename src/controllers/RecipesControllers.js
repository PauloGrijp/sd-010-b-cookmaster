const Service = require('../services/RecipesServices');

const createItem = async (req, res) => {
    const { name, ingredients, preparation } = req.body;

    const recipes = await Service.createItem(name, ingredients, preparation);

    if (recipes.err) return res.status(recipes.err.status).json(recipes.err.message);

    return res.status(201).json(recipes);
};

const getAll = async (_req, res) => {
    const recipes = await Service.getAll();

    return res.status(200).json(recipes);
};

const getRecipesById = async (req, res) => {
    const { id } = req.params;

    const recipe = await Service.getRecipesById(id);

    if (recipe.err) return res.status(recipe.err.status).json(recipe.err.message);

    return res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
    const { id } = req.params;

    const { name, ingredients, preparation } = req.body;

    const recipes = await Service.updateRecipe(id, name, ingredients, preparation);

    if (recipes.err) return res.status(recipes.err.status).json(recipes.err.message);

    return res.status(200).json(recipes);
};

const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    const recipes = await Service.deleteRecipe(id);

    if (recipes.err) return res.status(recipes.err.status).json(recipes.err.message);

    return res.status(200).json(recipes);
};

const storeImage = async (req, res) => {
    const { id } = req.params;
    const { path } = req.file;
    const recipe = await Service.getRecipesById(id);
    res.status(200).json({ ...recipe, image: `localhost:3000/${path}` });
};

module.exports = {
    createItem,
    getAll,
    getRecipesById,
    updateRecipe,
    deleteRecipe,
    storeImage,
};