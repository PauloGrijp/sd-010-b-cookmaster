const rescue = require('express-rescue');
const Joi = require('joi');

const createRecipes = rescue(async (req, res, next) => {
const { name, ingredients, preparation } = req.body;
const { error } = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().email().required(),
  preparation: Joi.string().required(),
}).validate({ name, ingredients, preparation });
if (error) {
  return next('userAndRecipes');
}
});

module.exports = {
  createRecipes,
};