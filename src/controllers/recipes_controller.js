const { create } = require('../services/recipe_service');

const createRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;

    const newRecipe = await create(name, ingredients, preparation, userId);
    
    return res.status(201).json({ recipe: newRecipe });
};

module.exports = {
    createRecipe,
};