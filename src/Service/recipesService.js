const recipesModel = require('../Model/recipesModel');
const validations = require('../validations/validations');

const getAll = async () => {
    const users = await recipesModel.getAll();
    return users;
};

const createRecipe = async (recipe, id) => {
    console.log(recipe, id);
    const infosRecipe = validations.infosRecipe(recipe);
    console.log(infosRecipe);
    if (infosRecipe === false) return false;
    const response = await recipesModel.create(recipe, id);
    return response;
};

module.exports = { createRecipe, getAll };