const services = require('../services/recipes');

const create = async (req, res) => {
  try {
    const recipe = req.body;
    const payload = await req.user;

    const validRecipe = await services.create(recipe, payload);

    return res.status(200).json({ recipe: validRecipe });
  } catch (error) {
    return res.status(error.err.code).json({ message: error.err.message });
  }
};

module.exports = {
  create,
};
