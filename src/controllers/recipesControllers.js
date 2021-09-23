const jwt = require('jsonwebtoken');

const recipeModel = require('../models/recipesModel');

const secret = 'programadorNaoTemFeriadoNemFinalDeSemana';

const message = {
    NotFound: 'recipe not found',
};

const STATUS_OK = {
    OK: 200,
    Created: 201,
    
};

const STATUS_ERROR = {
    NotFound: 404,
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

const findRecipeById = async (req, res) => {
    // Campos da Receita!
    const { id } = req.params;
    const recipe = await recipeModel.findRecipeById(id);
    if (recipe === null) {
        return res.status(STATUS_ERROR.NotFound).json({ message: message.NotFound });
    }
    
   return res.status(STATUS_OK.OK).json(recipe);
};

module.exports = {
    recipeRegistration,
    findAllRecipes,
    findRecipeById,
};