const rescue = require('express-rescue');
const Recipe = require('../services/serviceRecipes');
// const validateJWT = require('../schema/validateJWT');

const createRecipe = rescue(async (req, res, _next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    // Olhei a forma de usar o req.user da colega Mariana Savoldi
    const { _id } = req.user;

    const newRecipe = await Recipe.createRecipe(name, ingredients, preparation, _id);
    // console.log(newRecipe);

    if (typeof newRecipe.message === 'string') return res.status(400).json(newRecipe);

    return res.status(201).json({
      name: newRecipe.name,
      ingredients: newRecipe.ingredients,
      preparation: newRecipe.preparation,
      userId: _id,
      _id: Object.values(newRecipe)[4],
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = {
  createRecipe,
};