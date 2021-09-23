const Joi = require('joi');
const recipesServices = require('../services/recipesServices');
const { CODE_HTTP, MESSAGE } = require('../helpers/responses');

const createRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const { error } = Joi.object({
    name: Joi.string().required().not().empty(),
    ingredients: Joi.string().required().not().empty(),
    preparation: Joi.string().required().not().empty(),
  }).validate(req.body);
  if (error) return res.status(CODE_HTTP.BAD_REQUEST).json(MESSAGE.INVALID_ENTRIES);

  const resultService = await recipesServices
    .createRecipes({ name, ingredients, preparation, userId });

  return res.status(CODE_HTTP.CREATE_SUCCESS).json(resultService);
};

module.exports = {
  createRecipes,
};