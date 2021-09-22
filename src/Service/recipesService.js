const recipesModel = require('../Model/recipesModel');
const validations = require('../validations/validations');

const getAll = async () => {
    const users = await recipesModel.getAll();
    return users;
};
const getById = async (id) => {
    const recipe = await recipesModel.getById(id);
    return recipe;
};

const createRecipe = async (recipe, id) => {
    const infosRecipe = validations.infosRecipe(recipe);
    if (infosRecipe === false) return false;
    const response = await recipesModel.create(recipe, id);
    return response;
};

module.exports = { createRecipe, getAll, getById };