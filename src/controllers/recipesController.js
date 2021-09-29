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

  if (result.message) return res.status(StatusCodes.BAD_REQUEST).json(result);

  return res.status(StatusCodes.CREATED).json(result);
});

recipesRouter.get('/', async (req, res) => {
  const result = await recipesService.getAllRecipes();

  return res.status(StatusCodes.OK).json(result);
});

recipesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.getRecipeById(id);

  if (result.message) return res.status(StatusCodes.NOT_FOUND).json(result);

  return res.status(StatusCodes.OK).json(result);
});

recipesRouter.put('/:id', async (req, res) => {
  const updatedRecipe = req.body;
  const { id } = req.params;

  const token = req.headers.authorization;
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });

  let verifiedToken;

  try {
    verifiedToken = jwt.verify(token, secret);
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }

  const result = await recipesService.updateRecipeById(id, verifiedToken, updatedRecipe);

  return res.status(StatusCodes.OK).json(result);
});

recipesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const token = req.headers.authorization;
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });

  let verifiedToken;

  try {
    verifiedToken = jwt.verify(token, secret);
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }

  await recipesService.excludeRecipeById(id, verifiedToken);

  return res.status(StatusCodes.NO_CONTENT).json();
});

module.exports = recipesRouter;
