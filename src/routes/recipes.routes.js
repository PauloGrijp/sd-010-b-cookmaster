const { Router } = require('express');

const { 
  validaToken,
  validaRecipe,
 } = require('../middlewares/recipes.middlewares');
const { 
  enableModifications,  
 } = require('../middlewares/usuarios.middlewares');

const { addRecipes, listRecipes, listById,
  editRecipe, deleteRecipe, uploadPicture } = require('../controllers/recipes.controller');

const routes = new Router();

routes.post('/recipes', 
  validaToken,
    validaRecipe,
      addRecipes);

routes.get('/recipes', listRecipes);
routes.get('/recipes/:id', listById);

routes.put('/recipes/:id', 
  validaToken,
    enableModifications,
      editRecipe);

routes.put('/recipes/:id/image/', 
  validaToken,
      enableModifications,
        uploadPicture);  

routes.delete('/recipes/:id', 
  validaToken,
    enableModifications,
      deleteRecipe);

module.exports = routes;