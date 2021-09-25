const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const recipesController = require('../controllers/recipesController');
const { createFile } = require('../controllers/multerController');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(recipesController.addRecipes));

recipesRouter.get('/', rescue(recipesController.getRecipeByAll));
recipesRouter.get('/:id', rescue(recipesController.getRecipeById));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../src/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

// recipesRouter.put('/:id', rescue(recipesController.editRecipes));
recipesRouter.put('/:id/image', upload.single('arquivo'), createFile);

recipesRouter.delete('/:id', rescue(recipesController.deleteRecipes));

module.exports = recipesRouter;