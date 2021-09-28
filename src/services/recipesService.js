const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const verifyUser = require('../model/verifyUser');
const recipesModel = require('../model/recipesModel');

const recipeNotFound = { message: 'recipe not found' };

const err = {
  malformed: { err: { message: 'jwt malformed' } },
};

const secret = 'seusecretdetoken';

const jwtVal = async (token) => {
  if (!token) return err.malformed;
    try {
      const decoded = jwt.verify(token, secret);
      if (typeof decoded !== 'object') return err.malformed;
      const { email } = decoded.data;
      const user = await verifyUser.userExists({ email });
      if (!user) return err.malformed;
      return decoded.data;
  } catch (error) {
    return err.malformed;
  }
};

const add = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.add(name, ingredients, preparation, userId);
  if (!recipe) return {};
  return { recipe };
};

const getAll = async () => {
  const recipes = recipesModel.getAll();
  if (!recipes) return {};
  return recipes;
};

const getById = ({ id }) => {
  if (!ObjectId.isValid(id)) return recipeNotFound;
  return recipesModel.getById({ id });
};

const update = async (id, recipe, authorization) => {
  if (!authorization) return err.malformed;
  const validToken = await jwtVal(authorization);
  if (validToken.err) return err.malformed;
  const updateRecipe = await recipesModel.update(id, recipe);
  return updateRecipe;
 };

 function remove(id) {
   return recipesModel.remove(id);
 }

/*  const remove = async (id) => { return recipesModel.remove(id); }; */

module.exports = { add, getAll, getById, update, remove };