const service = require('../services/recipeService');
const messages = require('../helpers/validationMessages');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const result = await service.createRecipe({ name, ingredients, preparation });

    if (result === false) return res.status(400).json(messages.INVALID_ENTRY);

    return res.status(201).json({ recipe: {
      name,
      ingredients,
      preparation,
      userId: _id,
      _id: result.insertedId,
    } });
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

module.exports = {
  createRecipe,
};