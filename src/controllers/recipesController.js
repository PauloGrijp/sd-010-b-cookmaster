const recipesService = require('../services/recipesService');

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
    const newRecipe = await recipesService.created(name, ingredients, preparation, userId);
    
    return res.status(201).json({ recipe: newRecipe });
  } catch (error) {
    const { err: { code, message } } = error;
    return res.status(code).json({ message });
  }
};

module.exports = { create };