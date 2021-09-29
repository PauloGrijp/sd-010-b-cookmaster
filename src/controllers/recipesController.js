const express = require('express');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const recipesService = require('../services/recipesService');
const secret = require('./superpassword');

const recipesRouter = express.Router();

recipesRouter.post('/', async (req, res) => {
  const recipe = req.body;
  const token = req.headers.authorization;
  let verifiedToken;

  try {
    verifiedToken = jwt.verify(token, secret);
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }

  const result = await recipesService.createRecipe({ recipe, verifiedToken });

  if (result.message) {
    return res.status(StatusCodes.BAD_REQUEST).json(result);
  }

  return res.status(StatusCodes.CREATED).json(result);
});

recipesRouter.get('/', async (req, res) => {
  const result = await recipesService.getAllRecipes();

  return res.status(StatusCodes.OK).json(result);
});

module.exports = recipesRouter;
