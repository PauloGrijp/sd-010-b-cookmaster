const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'tigretigre';

const err = {
  status: 400,
  message: 'Invalid entries. Try again.',
};
const err2 = {
  status: 401,
  message: 'All fields must be filled',
};

const err3 = {
  status: 401,
  message: 'Incorrect username or password',
};

const err4 = {
  status: 401,
  message: 'jwt malformed',
};

const err5 = {
  status: 404,
  message: 'recipe not found',
};

function validName(name) {
  if (!name) throw err;
}
  
function validPassword(password) {
  if (!password) throw err;
}

function validEmail(email) {
  const re = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);
  if (!re) throw err;  
}

async function emailExists(email) {
  const result = await userModel.emailExists(email);
  return result;
}

function validCredentials(email, password) {
  if (!email || !password) throw err2;
}

function checkCredentials(user, password) {
  if (!user || user.password !== password) throw err3;
}

function existsToken(token) {
  if (!token) throw err4;
}

function checkToken(token) {
  try {
    const decodeToken = jwt.verify(token, secret);
    return decodeToken;
  } catch (error) {
    throw err4;
  }
}

function validRecipe(recipe) {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) throw err;
}

function checkRecipe(recipe) {
  if (!recipe) throw err5;
}

module.exports = {
  checkRecipe,
  validRecipe,
  checkToken,
  existsToken,
  checkCredentials,
  validCredentials,
  validName,
  validPassword,
  validEmail,
  emailExists,
};
