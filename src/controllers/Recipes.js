const express = require('express');
const multer = require('multer');
const path = require('path');
const validateJWT = require('../middleware/auth/validateJWT');

const recipesRouter = express.Router();
const recipesService = require('../services/Recipes');

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, path.resolve(__dirname, '..', 'uploads'));
  },
  filename(req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.params.id}.${ext}`);
  },
});

const upload = multer({ storage });

recipesRouter.post('/', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.user;

  const result = await recipesService
    .createRecipes({ name, ingredients, preparation, id });

  if (result.isError) return res.status(400).json({ message: result.message });

  return res.status(201).json(result);
});

recipesRouter.get('/', async (_req, res) => {
  const result = await recipesService.getAllRecipes();

  return res.status(200).json(result);
});

recipesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await recipesService.getRecipeById(id);

  if (result.isError) return res.status(404).json({ message: result.message });

  return res.status(200).json(result);
});

recipesRouter.put('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;

  const result = await recipesService.updateRecipe(id, userId, { name, ingredients, preparation });

  return res.status(200).json(result);
});

recipesRouter.delete('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;

  const result = await recipesService.deleteRecipe(id);

  return res.status(204).json(result);
});

recipesRouter.put('/:id/image', validateJWT, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const image = req.file;

  const imageUrl = `localhost:3000/src/uploads/${image.filename}`;
  const result = await recipesService.insertImageRecipe(id, imageUrl);

  res.status(200).json(result);
});

module.exports = recipesRouter;
