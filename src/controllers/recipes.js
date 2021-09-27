const services = require('../services/recipes');

const create = async (req, res) => {
  try {
    const recipe = req.body;
    const payload = await req.user;

    const validRecipe = await services.create(recipe, payload);

    return res.status(201).json({ recipe: validRecipe });
  } catch (error) {
    return res.status(error.err.code).json({ message: error.err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const allRecipes = await services.getAll();
    res.status(200).json(allRecipes);
  } catch (error) {
    return res.status(500).json();
  }
};

module.exports = {
  create,
  getAll,
};
