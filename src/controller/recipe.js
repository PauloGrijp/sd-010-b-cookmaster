const express = require('express');

const {
  verifyRecipeBody,
  verifyToken,
} = require('../middlewares/recipeMiddleware');

const {
  createRecipe,
  getAllRecipes,
} = require('../service/recipeService');

const httpStatus = require('./httpStatus');

const route = express.Router();

route.post('/',
  verifyRecipeBody,
  verifyToken,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { data: { email } } = req.loggedUser;
    const recipeInfo = await createRecipe({ name, ingredients, preparation }, email);
    res.status(httpStatus.created).json({ recipe:
      {
        ...recipeInfo,
        name,
        ingredients,
        preparation,
      },
    });
  });

route.get('/',
  async (_req, res) => {
  const recipes = await getAllRecipes();
  res.status(httpStatus.ok).json(recipes);
});

module.exports = route;
