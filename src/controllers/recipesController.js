const Joi = require('joi');

const { CODE_HTTP, MESSAGE } = require('../helpers/responses');
const recipesServices = require('../services/recipesServices');

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

const getAll = async (req, res) => {
  const resultServices = await recipesServices.getAll();
  return res.status(CODE_HTTP.SUCCESS).json(resultServices);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const { error } = Joi.string().validade(req.params);
  const resultService = await recipesServices.getById({ id });
  
  if (resultService === 404) { 
    return res.status(CODE_HTTP.NOT_FOUND).json(MESSAGE.RECIPE_NOT_FOUND); 
  }
  return res.status(CODE_HTTP.SUCCESS).json(resultService);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  if (!userId) return res.status(CODE_HTTP.UNAUTHORIZED).json(MESSAGE.MISSING_AUTH_TOKEN);

  const resultService = await recipesServices
    .update({ id, name, ingredients, preparation, userId });
  return res.status(CODE_HTTP.SUCCESS).json(resultService);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  await recipesServices.exclude({ id });
  return res.status(CODE_HTTP.NO_CONTENT).send();
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const resultService = await recipesServices.addImage({ id });
  return res.status(CODE_HTTP.SUCCESS).json(resultService);
};

// const getImage = async (req, res) => {
//   console.log('oi');
//   const { id } = req.params;
//   const image = await fs.readFile(`../uploads${id}.jpeg`, 'utf-8');
//   return res.status(200).json(image);
// };

module.exports = {
  createRecipes,
  getAll,
  getById,
  update,
  exclude,
  addImage,
};