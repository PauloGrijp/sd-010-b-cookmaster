const jwt = require('jsonwebtoken');
const { createRecipe, getAllRecipes, getRecipe } = require('../services/recipes');

const secret = '12345';

const create = async (req, res) => {
    const token = req.headers.authorization;
    const { name, ingredients, preparation } = req.body;
    const { id } = jwt.verify(token, secret);
    const result = await createRecipe(name, ingredients, preparation, id);
    return res.status(201).json({ recipe: { ...result, userId: id } });
};

const getRecipes = async (_req, res) => {
    const recipes = await getAllRecipes();
    return res.status(200).json(recipes);
};

const getRecipeID = async (req, res) => {
    const { id } = req.params;
    try {
        const recipes = await getRecipe(id);
        if (recipes === null) {
            return res.status(404).json({ message: 'recipe not found' });
        }
        return res.status(200).json(recipes);
    } catch (error) {
        return res.status(404).json({ message: 'recipe not found' });
    }
};

module.exports = { create, getRecipes, getRecipeID };