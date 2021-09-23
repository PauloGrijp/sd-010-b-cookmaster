const express = require('express');
const { findRecipes, createRecipes, findRecipesById } = require('../models/recipes');
const { isJWTvalid, recipesFillersCheck } = require('../middlewares/jwtValidate');
const { idRecipesCheck } = require('../middlewares/idRecipes');

const router = express.Router();

router.get('/',
async (req, res) => {
console.log('get');
const data = await findRecipes();
console.log(data, 'data');
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