const express = require('express');
const { findRecipes, createRecipes } = require('../models/recipes');
const { findRecipesById, deleteRecipesById } = require('../models/recipes');
const { updateRecipesById } = require('../models/recipes');
const { isJWTvalid, recipesFillersCheck } = require('../middlewares/jwtValidate');
const { idRecipesCheck } = require('../middlewares/idRecipes');
const { isJWTRecipe } = require('../middlewares/jwtRecipes');
const createUpload = require('../middlewares/image');

const router = express.Router();

router.put('/:id/image',
createUpload);

router.put('/:id',
recipesFillersCheck,
isJWTRecipe,
isJWTvalid,
async (req, res) => {
const { id } = req.params;
const { name, ingredients, preparation } = req.body;
await updateRecipesById(id, name, ingredients, preparation);
const data = await findRecipesById(id);
return res.status(200).json(data);
});

router.get('/:id',
idRecipesCheck,
async (req, res) => {
const { id } = req.params;
console.log(id);
const data = await findRecipesById(id);
console.log(data, 'data');
return res.status(200).json(data);
});

router.delete('/:id',
idRecipesCheck,
isJWTRecipe,
async (req, res) => {
const { id } = req.params;
console.log(id);
await deleteRecipesById(id);
return res.status(204).json();
});

router.get('/',
async (req, res) => {
console.log('get');
const data = await findRecipes();
console.log(data, 'data');
return res.status(200).json(data);
});

router.post('/',
recipesFillersCheck,
isJWTvalid, 
async (req, res) => {
const verify = req.user;
console.log(verify);
const recipeInfo = req.body;
await createRecipes(req.body);
res.status(201).json({ recipe: { ...recipeInfo } });
});

module.exports = router;