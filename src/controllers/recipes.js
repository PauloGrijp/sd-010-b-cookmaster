const model = require('../models/recipes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const createdRecipe = await model.create(name, ingredients, preparation, _id);

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return res.status(201).json(createdRecipe);
};

module.exports = {
  createRecipe,
};
