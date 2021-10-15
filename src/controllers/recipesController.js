const { createNewRecipe } = require('../services/recipeServices');

const newRecipe = async (req, res) => {
  const { user: { _id }, body: { name, ingredients, preparation } } = req;
  if (!name || !ingredients || !preparation) {
    return res
      .status(400).json({ message: 'Invalid entrie. Try again.' }); 
  }
  
  const recipe = await createNewRecipe(_id, name, ingredients, preparation);

  return res.status(201).send(recipe);
};

module.exports = {
  newRecipe,
};
