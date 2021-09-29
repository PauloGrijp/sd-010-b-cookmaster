const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipesModel');
const userModel = require('../models/usersModel');
const AppError = require('../utils/appError');

const secret = 'seusecretdetoken';

function valid({ name, ingredients, preparation }) {
  if (!name) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }
  if (!ingredients) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }
  if (!preparation) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }
  return true;
}

async function validToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new AppError(401, 'jwt malformed');
  }
}

async function returnObjRecipe(token, body) {
  const { _id } = await userModel.getByEmail(token.data.email);
  const newRecipe = {
    ...body,
    userId: _id,
  };
  const { insertedId: id } = await recipesModel.create(newRecipe);
  return { recipe: { ...newRecipe, _id: id } };
}

const create = async (body, token) => {
  const validateBody = valid(body);
  try {
    const validateToken = await validToken(token);
    if (validateToken.message) {
      return validateToken;
    }
    if (validateBody.message) {
      return validateBody;
    }
    return returnObjRecipe(validateToken, body);
  } catch (err) {
    return err;
  }
};

const getById = async (id) => {
  if (id.length !== 24) {
    return { status: 404, message: 'recipe not found' };
  }
  const find = await recipesModel.getById(id);
  if (!find) {
    return { status: 404, message: 'recipe not found' };
  }
  return find;
};

const validAuthUser = async (id, { data }, newObj) => {
  const { _id } = await userModel.getByEmail(data.email);
  const { userId } = await recipesModel.getById(id);
  const recipe = await recipesModel.getById(id);
  if (parseFloat(userId) !== parseFloat(_id)) {
    return { status: 401, message: 'Unauthoration' };
  }
  if (!newObj) {
    return recipe;
  }
  return { ...newObj, userId };
};

const updateId = async (id, body, token) => {
  const validateBody = valid(body);
  const newObj = { _id: id, ...body };
  try {
    if (validateBody.message) {
      return validateBody;
    }
    const validateToken = await validToken(token);
  if (validateToken.message) {
    return validateToken;
  }
    const isValidUser = await validAuthUser(id, validateToken, newObj);
    await recipesModel.update(id, newObj);
    return isValidUser;
  } catch (err) {
      return err;
  }
};

const deleteId = async (id, token) => {
  try {
    const validateToken = await validToken(token);
    if (validateToken.message) {
      return validateToken;
    }
    await validAuthUser(id, validateToken);
    await recipesModel.deleteId(id);
    return 'No body returned for response';
  } catch (err) {
    return err;
  }
};

const validateUser = async (id, token) => {
  try {
    const validateToken = await validToken(token);
    const isValidUser = await validAuthUser(id, validateToken);
    return isValidUser;
  } catch (err) {
    return err;
  }
};
// Desconsidere essa função abaixo
const addImage = async (id, recipe) => {
  const add = await recipesModel.insertImage(id);
};

module.exports = {
  create,
  getById,
  addImage,
  validateUser,
  deleteId,
  updateId,
};