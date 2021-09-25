const service = require('../services/recipeService');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const create = await service.createRecipe(name, ingredients, preparation, _id);

    res.status(201).json(create);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createRecipe,
};