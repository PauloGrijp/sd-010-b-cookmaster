// const multer = require('multer');
// const jwtValidation = require('../middlewares/jwtValidation');
const recipeService = require('../services/recipeService');
const recipeModel = require('../models/recipeModel');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

// req 3
const registerRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const { message, id } = await recipeService.registerRecipeValidation({ 
    name, ingredients, preparation,
  });

  if (message) {
    return res.status(BAD_REQUEST).json({ message });
  }

  return res.status(CREATED).json(
    { recipe: { name, ingredients, preparation, userId, _id: id } },
    );
};

// req 4
const findAllRecipes = async (req, res) => {
  const recipes = await recipeModel.findAllRecipes();

  return res.status(OK).json(recipes);
};

// req 5
const findRecipeById = async (req, res) => {
  const { id } = req.params;
  const { message } = await recipeService.findRecipeByIdValidation(id);
  const recipeById = await recipeService.findRecipeByIdValidation(id);

  if (message) {
    return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }

  return res.status(OK).json(recipeById);
};

// req 7
const editRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const { id } = req.params;
  const { message } = await recipeService
    .editRecipeValidation({ name, ingredients, preparation }, id);

  if (message) {
    return res.status(BAD_REQUEST).json({ message });
  }

  return res.status(OK).json({ _id: id, name, ingredients, preparation, userId });
};

// req 8
const delRecipe = async (req, res) => {
  const { id } = req.params;
  const { message } = await recipeService.delRecipeValidation(id);
  
  if (message) {
    return res.status(BAD_REQUEST).json({ message });
  }

  return res.status(NO_CONTENT).json(id);
};

// req 9
const imgUpload = async (req, res) => {
  const { id } = req.params;
  const { path: pathFile } = req.file;
  const { _id: userId } = req.user;
  const { _id, name, ingredients, preparation, message } = await recipeService
    .findRecipeByIdValidation(id);

    if (message) {
      return res.status(BAD_REQUEST).json({ message });
    }
  
    await recipeService.imgUploadValidation(id, `localhost:3000/${pathFile}`);
    return res.status(OK).json(
      { _id, name, ingredients, preparation, userId, image: `localhost:3000/${pathFile}` },
    );
  };

module.exports = {
  registerRecipe,
  findAllRecipes,
  findRecipeById,
  editRecipe,
  delRecipe,
  imgUpload,
};
