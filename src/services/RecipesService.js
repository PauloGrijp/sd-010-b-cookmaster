const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const recipesModel = require('../models/RecipesModel');

const secret = 'minhasupersenha';

const errorInvalidEntries = {
    message: 'Invalid entries. Try again.',
};

const invalidToken = {
    message: 'jwt malformed',
};

const recipeNotFound = {
    message: 'recipe not found',
};

const validateIfFieldsExists = async (name, ingredients, preparation) => {
    if (!name || !ingredients || !preparation) {
        return errorInvalidEntries;
    }
};

let getIdUser = ''; // Para jogar no objeto retornado da receita recém adicionada

const validateToken = async (token) => {
    try {
        const { data: { id, email } } = jwt.verify(token, secret);
        // console.log(id);
        const user = await recipesModel.verifyUser(email);
        getIdUser = id;
        return user;
    } catch (err) {
        if (err) {
            return invalidToken;
        }
    }
    // const { data: { email } } = jwt.verify(token, secret);
    // // console.log(id);
    // const user = await recipesModel.verifyUser(email);
    // console.log(user);
    // if (!user) {
    //     return invalidToken;
    // }
    // // getIdUser = id;
    // return user;
};

const addRecipes = async (name, ingredients, preparation) => {
    const addRecipe = await recipesModel.addNewRecipes(name, ingredients, preparation, getIdUser);
    return addRecipe;
};

const getAllRecipes = async () => {
    const getRecipes = await recipesModel.getAllRecipes();
    return getRecipes;
};

const getRecipeById = async (id) => {
    if (!ObjectId.isValid(id)) {
        return recipeNotFound;
    }
    const getRecipe = await recipesModel.getRecipeById(id);
    if (!getRecipe) {
        return recipeNotFound;
    }
    return getRecipe;
};

module.exports = {
    validateIfFieldsExists,
    validateToken,
    addRecipes,
    getAllRecipes,
    getRecipeById,
};
