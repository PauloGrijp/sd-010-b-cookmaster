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

    if (id.length < 24) return res.status(404).json({ message: 'recipe not found' });

    return res.status(200).json(recipe);
}

module.exports = {
    createItem,
    getAll,
    getRecipesById,
};