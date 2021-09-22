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
    // if (!token) {
    //   return { status: 401, message: 'jwt malformed' };
    // }
    return jwt.verify(token, secret);
  } catch (err) {
    throw new AppError(401, 'jwt malformed');
  }
}

async function returnObjRecipe(token, body) {
  const { _id } = await userModel.getByEmail(token.data.email);
  const { insertedId: id } = await recipesModel.create(body);
  return { recipe: {
    ...body,
    userId: _id,
    _id: id,
  } };
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

module.exports = {
  create,
};