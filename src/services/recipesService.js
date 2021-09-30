const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const recipesModel = require('../models/recipesModel');

const schemaValidateRecipes = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const create = async (name, ingredients, preparation, userId) => {
  const validateCreate = schemaValidateRecipes.validate({
    name, ingredients, preparation,
  });
  if (validateCreate.error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      err: 'Invalid entries. Try again.',
    };
  }
  const recipe = await recipesModel.create(name, ingredients, preparation, userId);
  return {
    status: StatusCodes.CREATED, recipe,
  };
};

const listAllRecipes = async () => {
  const recipesAll = await recipesModel.listAll();
  return {
    status: StatusCodes.OK, recipesAll,
  };
};

const getRecipeById = async (id) => {
  const recipeById = await recipesModel.getRecipeById(id);
  if (!recipeById) {
    return {
      status: StatusCodes.NOT_FOUND, err: 'recipe not found',
    };
  }
  return {
    status: StatusCodes.OK, recipeById,
  };
};

const updateRecipesById = async (id, { name, ingredients, preparation }) => {
  const recipeUpdate = await recipesModel.update(id, name, ingredients, preparation);
  return { status: StatusCodes.OK, recipeUpdate };
};

const deleteRecipeById = async (id) => {
  const recipeDeleted = await recipesModel.exclude(id);
  return { status: StatusCodes.NO_CONTENT, recipeDeleted };
};

const updateImage = async (id, image) => {
  const recipeImage = await recipesModel.updateImage(id, image);
  return { status: StatusCodes.OK, recipeImage };
};

module.exports = {
  create,
  listAllRecipes,
  getRecipeById,
  updateRecipesById,
  deleteRecipeById,
  updateImage,
};
