const recipesRoute = require('express').Router();
const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path');
const { validateToken } = require('../middlewares/validateToken');
const RecipesController = require('../controllers/recipes.controller');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },

  filename: (req, _file, cb) => {
    cb(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({ storage });

recipesRoute.put('/:id/image', rescue(validateToken),
  upload.single('image'), RecipesController.insertImage);
recipesRoute.post('/', rescue(validateToken), rescue(RecipesController.createRecipe));
recipesRoute.get('/', rescue(RecipesController.getAllRecipes));
recipesRoute.get('/:id', rescue(RecipesController.getRecipeById));
recipesRoute.put('/:id', rescue(validateToken), rescue(RecipesController.updateRecipe));
recipesRoute.delete('/:id', rescue(validateToken), rescue(RecipesController.deletedeRecipe));

module.exports = recipesRoute;