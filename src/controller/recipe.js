const express = require('express');
const { ObjectId } = require('mongodb');

const {
  verifyRecipeBody,
  verifyToken,
} = require('../middlewares/recipeMiddleware');

const {
  createRecipe,
  getAllRecipes,
  getById,
  editRecipe,
  getIdByEmail,
  deleteRecipe,
} = require('../service/recipeService');

const httpStatus = require('./httpStatus');

const route = express.Router();

route.delete('/:id',
  verifyToken,
  async (req, res) => {
    const { id } = req.params;
    const { email } = req.loggedUser.data;
    const userId = await getIdByEmail(email);
    await deleteRecipe(userId, id);
    return res.status(httpStatus.NoContent).send();
  });

route.put('/:id',
  verifyRecipeBody,
  verifyToken,
  async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const edition = { name, ingredients, preparation };
    
    if (ObjectId.isValid(id)) {
      const recipe = await editRecipe(edition, id);
      if (req.loggedUser.data.email) {
        const { email } = req.loggedUser.data;
        const userId = await getIdByEmail(email);
        recipe.userId = userId;
      }
      return res.status(httpStatus.ok).json(recipe);
    }
    return res.status(httpStatus.notFound).json({
      message: 'recipe not found',
    });
  });

route.get('/:id',
async (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    const recipe = await getById(id);
    return res.status(httpStatus.ok).json(recipe);
  }
  return res.status(httpStatus.notFound).json({
    message: 'recipe not found',
  });
});

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
