const rescue = require('express-rescue');
const Joi = require('joi');
const recipeService = require('../services/recipeSevice');

const createRecipes = rescue(async (req, res, next) => {
const { name, ingredients, preparation } = req.body;

const { _id } = req.user;
const userId = _id;
const { error } = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
}).validate(req.body);
if (error) {
  return next('userAndRecipes');
}
const create = await recipeService.createRecipe(name, ingredients, preparation, userId);
console.log(create);

return res.status(201).json(create);
});

module.exports = {
  createRecipes,
};