const rescue = require('express-rescue');
const Joi = require('joi');
const RecipesService = require('../services/recipesService');

const create = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(req.body);

  if (error) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  const { userId } = res;

  const newRecipe = await RecipesService.create(name, ingredients, preparation, userId);
  if (newRecipe.err) return next(newRecipe.err);

  return res.status(201).json({
    recipe: {
      ...newRecipe,
    },
  });
});

const getAll = rescue(async (_req, res, _next) => {
  const allRecipes = await RecipesService.getAll();
  return res.status(200).json(allRecipes);
});

const getOne = rescue(async (req, res, _next) => {
  const { id } = req.params;

  if (id.length < 24) return res.status(404).json({ message: 'recipe not found' });

  const response = await RecipesService.getOne(id);
  if (!response) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(response);
});

const updateOne = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { role, userId } = res;
  const { name, ingredients, preparation } = req.body;

  const recipe = await RecipesService.getOne(id);

  if (userId === recipe.userId || role === 'admin') {
    await RecipesService.updateOne(id, name, ingredients, preparation);
    return res.status(200).json({ _id: id, name, ingredients, preparation, userId });
  }
  return res.status(401).json({ message: 'not authorized to edit this recipe' });
});

const deleteOne = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { role, userId } = res;

  const recipe = await RecipesService.getOne(id);

  if (userId === recipe.userId || role === 'admin') {
    await RecipesService.deleteOne(id);
    return res.status(204).send();
  }
  return res.status(401).json({ message: 'not authorized to delete this recipe' });
});

const addImage = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { role, userId } = res;

  const recipe = await RecipesService.getOne(id);
  if (!recipe) return res.status(400).json({ message: 'recipe not found' });

  if (userId === recipe.userId || role === 'admin') {
    await RecipesService.addImage(id, `${id}.jpeg`);
    res.response = { ...recipe, image: `localhost:3000/src/uploads/${id}.jpeg` };
    return next();
  }
  return res.status(401).json({ message: 'not authorized to add image this recipe' });
});

module.exports = {
  addImage,
  create,
  deleteOne,
  getAll,
  getOne,
  updateOne,
};