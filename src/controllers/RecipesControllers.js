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

module.exports = {
    createItem,
    getAll,
};