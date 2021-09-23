const jwt = require('jsonwebtoken');

const recipeModel = require('../models/recipesModel');

const secret = 'programadorNaoTemFeriadoNemFinalDeSemana';

const STATUS_OK = {
    OK: 200,
    Created: 201,
};

const recipeRegistration = async (req, res) => {
    // Campos da Receita!
    const token = req.headers.authorization;
    const { name, ingredients, preparation } = req.body;
    // descriptografia do token
    const { data: { _id } } = jwt.verify(token, secret);
    const recipeCreated = await recipeModel.createNewRecipe(name, ingredients, preparation, _id);
    
   return res.status(STATUS_OK.Created).json({ recipe: recipeCreated });
};

const findAllRecipes = async (req, res) => {
    // Campos da Receita!
    const allRecipes = await recipeModel.findAllRecipes();
    
   return res.status(STATUS_OK.OK).json(allRecipes);
};

module.exports = {
    recipeRegistration,
    findAllRecipes,
};