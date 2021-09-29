const rescue = require('express-rescue');
const Recipe = require('../services/serviceRecipes');
const validateJWT = require('../schema/validateJWT');

const createRecipe = rescue(async (req, res, _next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    console.log(token);
    const newValidate = await validateJWT(token);

    const newRecipe = await Recipe.createRecipe(name, ingredients, preparation);

    if (typeof newRecipe.message === 'string') return res.status(400).json(newRecipe);

    if (typeof newValidate.message === 'string') return res.status(401).json(newValidate);

    return res.status(201).json({
      name: newRecipe.name,
      ingredients: newRecipe.ingredients,
      preparation: newRecipe.preparation,
      userId: Object.values(newValidate)[0],
      _id: newRecipe.id,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = {
  createRecipe,
};