const services = require('../services/recipes');

const create = async (req, res) => {
  try {
    const recipe = req.body;

    const validRecipe = await services.create(recipe);

    return res.status(200).json({ recipe: validRecipe });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  create,
};
