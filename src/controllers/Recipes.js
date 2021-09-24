const express = require('express');
const multer = require('multer');
const path = require('path');

const recipeRouter = express.Router();
const recipeService = require('../services/Recipes');
const middleware = require('../middleware/ValidateJWT');

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, path.resolve(__dirname, '../uploads/'));
  },
  filename(req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.params.id}.${ext}`);
  },
});

const upload = multer({ storage });

recipeRouter.post('/', middleware.verifyToken, async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  console.log('req.user recipe', req.user);

  const result = await recipeService.createRecipe({ name, ingredients, preparation, userId: _id });

  if (result.isError) {
    return res.status(400).json({ message: result.message });
  }
  return res.status(201).json(result);
});

recipeRouter.get('/', async (req, res) => {
  const result = await recipeService.getAllRecipes();

  return res.status(200).json(result);
});

recipeRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.getRecipeById(id);

  if (result.isError) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(200).json(result);
});

recipeRouter.put('/:id', middleware.verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;  

  const result = await recipeService.updateRecipe(id, userId, { name, ingredients, preparation });
  res.status(200).json(result);
});

recipeRouter.delete('/:id', middleware.verifyToken, async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.deleteRecipe(id);
  res.status(204).json(result);
});

recipeRouter.put('/:id/image', middleware.verifyToken, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const image = req.file;

  const imageURL = `localhost:3000/src/uploads/${image.filename}`;
  const result = await recipeService.upLoadImage(id, imageURL);

  res.status(200).json(result);
});

module.exports = recipeRouter;
