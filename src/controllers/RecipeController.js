const express = require('express');
const code = require('http-status-codes');
const multer = require('multer');

const recipeRouter = express.Router();
const validationJWT = require('../middlewares/validationJWT');

const RecipeService = require('../services/RecipeService');
const RecipeModel = require('../models/RecipeModel');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    const fileExtension = `${id}.jpeg`;
    callback(null, fileExtension);
  },
});

const upload = multer({ storage });

// cria a receita
recipeRouter.post('/', validationJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  
  const { message, id } = await RecipeService.createRecipe({ 
    name, ingredients, preparation,
  });
  
  if (message) {
    return res.status(code.BAD_REQUEST).json({ message });
  }

  return res.status(code.CREATED).json(
    { recipe: { name, ingredients, preparation, userId, _id: id } },
    );
});

// visualiza receitas
recipeRouter.get('/', async (req, res) => {
  const allRecipes = await RecipeModel.getAllRecipes();
  if (!allRecipes) {
    return res.status(code.NOT_FOUND).json({ message: 'Nenhuma receita encontrada' });
  }
  return res.status(code.OK).json(allRecipes);
});

// visualiza receita pelo ID
recipeRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeService.getRecipeById(id);
  
  if (recipe.message) {
    return res.status(code.NOT_FOUND).json({ message: 'recipe not found' });
  }
  return res.status(code.OK).json(recipe);
});

// atualiza receita
recipeRouter.put('/:id', validationJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const { id } = req.params;
    
  const { message } = await RecipeService.updateRecipe({ 
    name, ingredients, preparation,
  }, id);
  
  if (message) {
    return res.status(code.BAD_REQUEST).json({ message });
  }

  return res.status(code.OK).json(
    { _id: id, name, ingredients, preparation, userId },
    );
});

// deleta receita
recipeRouter.delete('/:id', validationJWT, async (req, res) => {
  const { id } = req.params;

  const { message } = await RecipeService.deleteRecipe(id);
  if (message) {
    return res.status(code.BAD_REQUEST).json({ message });
  }

  return res.status(code.NO_CONTENT).json(id);
});

// atualiza receita com imagem
recipeRouter.put('/:id/image', validationJWT, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { path: pathFile } = req.file;
  const { _id: userId } = req.user;
  const { _id, name, ingredients, preparation, message } = await RecipeService.getRecipeById(id);

  if (message) {
    return res.status(code.BAD_REQUEST).json({ message });
  }
  
  await RecipeService.uploadImage(id, `localhost:3000/${pathFile}`);
  return res.status(200).json(
    { _id, name, ingredients, preparation, userId, image: `localhost:3000/${pathFile}` },
  );
});
module.exports = recipeRouter;