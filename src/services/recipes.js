const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const RecipeModel = require('../models/recipes');
const UserModel = require('../models/users');

const { secret } = require('../controllers/login');

const err = {
  malformed: { err: { message: 'jwt malformed' } },
  notFound: { err: { message: 'recipe not found' } },
};

const validateRecipe = ({ name, preparation, ingredients }) => {
  const data = [name, preparation, ingredients];
  return data.every((el) => el);
};

const validateToken = async (token) => {
  if (!token) return err.malformed;
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded !== 'object') return err.malformed;

    const { email } = decoded.data;
    const user = await UserModel.emailAlreadyExists(email);
    if (!user) return err.malformed;

    return decoded.data;
  } catch (error) {
    return err.malformed;
  }
};

const validateId = (id) => (ObjectId.isValid(id));

// crud

const create = async (recipe, authorization) => {
  if (!authorization) return err.malformed;
  const validToken = await validateToken(authorization);
  
  if (validToken.err) return err.malformed;
  const validRecipe = validateRecipe(recipe);
  if (validRecipe === false) return false;

  const { _id: userId } = validToken;
  const newRecipe = { ...recipe };
  newRecipe.userId = userId;
  
  const createRecipe = await RecipeModel.create(newRecipe);
  return createRecipe;
};

const getAllRecipes = async () => {
  const recipes = await RecipeModel.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!validateId(id)) return err.notFound;

  const recipe = await RecipeModel.getRecipeById(id);
  if (!recipe) return err.notFound;
  return recipe;
};

const updateRecipe = async (id, recipe, authorization) => {
  if (!authorization) return err.malformed;
  const validToken = await validateToken(authorization);
  if (validToken.err) return err.malformed;

  const update = await RecipeModel.updateRecipe(id, recipe);
  return update;
};

const deleteRecipe = async (id, authorization) => {
  if (!authorization) return err.malformed;
  const validToken = await validateToken(authorization);
  if (validToken.err) return err.malformed;

  const del = await RecipeModel.deleteRecipe(id);
  return del;
};

const recipeImg = async (id, authorization) => {
  if (!authorization) return err.malformed;
  const validToken = await validateToken(authorization);
  if (validToken.err) return err.malformed;
  const imgUrl = `localhost:3000/src/uploads/${id}.jpeg`;

  const recipeImage = await RecipeModel.recipeImg(id, imgUrl);
  return recipeImage;
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  recipeImg,
};
