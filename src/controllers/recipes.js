const express = require('express');
const { findRecipes, createRecipes } = require('../models/recipes');
const { isJWTvalid, recipesFillersCheck } = require('../middlewares/jwtValidate');

const router = express.Router();

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